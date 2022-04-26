/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />

import React from "./deps/react.ts";
import { minBy } from "./deps/std/collections.ts";
import { IndexedNode, parseLine } from "./parseline.ts";
import { Line, Position } from "./types.ts";

export function getCharDOM(line: number, column: number): Element | undefined {
  const l = document.getElementsByClassName(`l-${line}`);
  const c = l[0]?.getElementsByClassName(`c-${column}`);
  return c?.[0];
}

export const defaultPosition: Position = {
  line: -1,
  column: -1,
};

export function positionFromElement(
  element: Element,
  clientX: number,
  clientY: number,
): Position {
  const line = element.closest(".line");
  const lineMatch = line?.className.match(/l-(\d+)/);
  const lineIndex = parseInt(String(lineMatch?.[1]));
  if (isNaN(lineIndex)) {
    console.log("isNaN(lineIndex)");
    return defaultPosition;
  }
  // 行の全文字を取得、ターゲット地点との平方ユークリッド距離を算出
  const chars = Array.from(line?.getElementsByClassName("char-index") ?? [])
    .filter((element) => !element.className.includes("dummy"))
    .map((element) => {
      const rect = element.getBoundingClientRect();
      const medX = rect.left + (rect.width / 2);
      const medY = rect.top + (rect.height / 2);
      const distance = Math.pow(clientX - medX, 2) +
        Math.pow(clientY - medY, 2);
      return { element, distance, rect, medX };
    });

  // ターゲット地点より右下に要素の底及び端が無い場所を末尾と規定する
  // 距離だけを見ているため単純にやると折り返し前の要素に反応してしまう
  const tailRect = chars.at(-1)?.rect;
  if (
    tailRect == null || clientX >= tailRect.right && clientY >= tailRect.top
  ) {
    return {
      line: lineIndex,
      column: chars.length,
    };
  }
  // charsが空の場合tailRectの取得ができないのでアサーション可
  const char = minBy(chars, (char) => char.distance)!;
  const charMatch = char.element.className.match(/c-(\d+)/);
  const charIndex = parseInt(String(charMatch?.[1]));
  if (isNaN(charIndex)) {
    console.log("isNaN(charIndex)");
    return defaultPosition;
  }
  return {
    line: lineIndex,
    column: clientX < char.medX ? charIndex : charIndex + 1,
  };
}

const Char: React.FC<{ column: number; notation?: boolean; dummy?: boolean }> =
  (
    { column, notation, children, dummy },
  ) => (
    <span
      className={`char-index${dummy ? " dummy" : ""} ${
        notation ? "notation" : ""
      } c-${column}`}
    >
      {children}
    </span>
  );

const Line: React.FC<{ line: number; cursor: boolean }> = (
  { line, cursor, children },
) => (
  <div className={`line l-${line} ${cursor ? "cursor-line" : ""}`}>
    {children}
  </div>
);

function mapToElement(node: IndexedNode): JSX.Element {
  if (node.type === "character") {
    return (
      <Char key={node.index} column={node.index} notation={node.notation}>
        {node.character}
      </Char>
    );
  }
  const inner = node.inner.map(mapToElement);
  if (node.type === "bracket") {
    return <a href={node.text.slice(1, -1)}>{inner}</a>;
  }
  if (node.type === "anchor") {
    return <a href={node.url}>{inner}</a>;
  }
  if (node.type === "inlineCode") {
    return <code>{inner}</code>;
  }
  if (node.type === "decoration") {
    if (node.decorationType === "*") {
      return <strong>{inner}</strong>;
    }
    if (node.decorationType === "/") {
      return <i>{inner}</i>;
    }
    if (node.decorationType === "-") {
      return <del>{inner}</del>;
    }
  }
  return <>{inner}</>;
}

export function LineView(
  props: { line: Line; lnum: number; cursor: boolean },
): JSX.Element {
  if (props.line.cache == null || props.line.text !== props.line.cache.key) {
    const [indent, node] = parseLine(props.line.text);
    const textDOM = node.map(mapToElement);
    if (textDOM.length === 0) {
      if (indent === 0) {
        textDOM.push(<Char column={0} dummy>&#8203;</Char>);
      } else {
        textDOM.push(<br />);
      }
    }
    if (indent !== 0) {
      const indentWidth = `${1.5 * indent}em`;
      // pad部分は文字がセットされてないとずれる
      const indentDOM = Array.from(
        Array(indent),
        (_, i) => (
          <Char key={i} column={i}>
            <span className="pad">&#009;</span>
          </Char>
        ),
      );
      indentDOM.push(<span className="dot" />);
      props.line.cache = {
        key: props.line.text,
        element: (
          <>
            <span
              className="indent-mark"
              style={{ width: indentWidth }}
            >
              {indentDOM}
            </span>
            <span className="indent" style={{ marginLeft: indentWidth }}>
              {textDOM}
            </span>
          </>
        ),
      };
    } else {
      props.line.cache = {
        key: props.line.text,
        element: <>{textDOM}</>,
      };
    }
  }
  return (
    <Line line={props.lnum} cursor={props.cursor}>
      {props.line.cache.element}
    </Line>
  );
}
