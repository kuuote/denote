import React from "./deps/react.ts";
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

export function LineView(props: { line: Line; lnum: number }): JSX.Element {
  const str = props.line.text.trimStart();
  const indent = props.line.text.length - str.length;
  const textDOM = [...str].map((c, i) => (
    <span className={`char-index c-${i + indent}`}>
      {c}
    </span>
  ));
  if (textDOM.length === 0) {
    textDOM.push(<span className="char-index dummy c-0">&#8203;</span>);
  }

  if (indent !== 0) {
    const indentWidth = `${1.5 * indent}em`;
    const indentDOM = Array.from(
      Array(indent),
      (_, i) => (
        <span className={`char-index c-${i}`}>
          <span className="pad">
          </span>
        </span>
      ),
    );
    indentDOM.push(
      <span className="dot">
      </span>,
    );
    return (
      <div className={`line l-${props.lnum}`}>
        <span
          className="indent-mark"
          style={{ width: indentWidth }}
        >
          {indentDOM}
        </span>
        <span className="indent" style={{ marginLeft: indentWidth }}>
          {textDOM}
        </span>
      </div>
    );
  }
  return <div className={`line l-${props.lnum}`}>{textDOM}</div>;
}
