/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />

import React from "./deps/react.ts";
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
  // lineIndexでチェックは済ませてるのでアサーションする
  const chars = Array.from(line!.getElementsByClassName("char-index"))
    .map((element) => {
      const rect = element.getBoundingClientRect();
      const medX = rect.left + (rect.width / 2);
      const medY = rect.top + (rect.height / 2);
      const distance = Math.pow(clientX - medX, 2) +
        Math.pow(clientY - medY, 2);
      return { element, distance, medX };
    })
    .sort((a, b) => a.distance - b.distance);
  if (chars.length === 0) {
    return defaultPosition;
  }
  const char = chars[0];
  // Must always zero index if empty line
  // see line.tsx
  if (char.element.className.includes("dummy")) {
    return {
      line: lineIndex,
      column: 0,
    };
  }
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

const Char: React.FC<{ column: number; dummy?: boolean }> = (
  { column, children, dummy },
) => (
  <span className={`char-index${dummy ? " dummy" : ""} c-${column}`}>
    {children}
  </span>
);

const Line: React.FC<{ line: number }> = (
  { line, children },
) => (
  <div className={`line l-${line}`}>
    {children}
  </div>
);

function mapToElement(node: IndexedNode): JSX.Element {
  if (node.type === "character") {
    return <Char key={node.index} column={node.index}>{node.character}</Char>;
  }
  const inner = node.inner.map(mapToElement);
  if (node.type === "bracket") {
    return <a href="blah">{inner}</a>;
  }
  if (node.type === "inlineCode") {
    return <code>{inner}</code>;
  }
  if (node.type === "decoration") {
    if (node.decorationType === "*") {
      return <strong>{inner}</strong>;
    }
    if (node.decorationType === "/") {
      return <i>{inner}</i>
    }
    if (node.decorationType === "-") {
      return <del>{inner}</del>;
    }
  }
  return <>{inner}</>;
}

export function LineView(props: { line: Line; lnum: number }): JSX.Element {
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
  return <Line line={props.lnum}>{props.line.cache.element}</Line>;
}
