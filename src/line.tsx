import React from "./deps/react.ts";

export function Line(props: { line: string; lnum: number }): JSX.Element {
  const str = props.line.trimStart();
  const indent = props.line.length - str.length;
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
          <span
            className="pad"
            style={{ display: "inline-block", width: "1.5em", height: "1em" }}
          >
          </span>
        </span>
      ),
    );
    indentDOM.push(
      <span
        className="dot"
        style={{
          display: "block",
          position: "absolute",
          right: "9px",
          top: "10px",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "black",
        }}
      >
      </span>,
    );
    return (
      <div className={`line l-${props.lnum}`}>
        <span
          className="indent-mark"
          style={{ position: "absolute", width: indentWidth }}
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
