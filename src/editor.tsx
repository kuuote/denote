import React from "./deps/react.ts";
import { Line } from "./line.tsx";

export function Editor(props: { lines: string[] }): JSX.Element {
  return <>{props.lines.map((line) => <Line line={line} />)}</>;
}
