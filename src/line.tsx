import React from "./deps/react.ts";
import { Line } from "./types.ts";

export function LineView(props: { line: Line; lnum: number }): JSX.Element {
  const str = props.line.text.trimStart();
  const indent = props.line.text.length - str.length;
  const textDOM = [...str].map((c, i) => (
    <span className={`char-index c-${i + indent}`}>
      {c}
    </span>
  ));
  if (textDOM.length === 0) {
    textDOM.push(<span className="char-index c-0">&#8203;</span>);
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
