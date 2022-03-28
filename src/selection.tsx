/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />

import React from "./deps/react.ts";
import { defaultPosition } from "./line.tsx";
import { Rect } from "./rect.ts";
import { Position } from "./types.ts";

export type Selection = {
  start: Position;
  end: Position;
};

export const defaultSelection: Selection = {
  start: defaultPosition,
  end: defaultPosition,
};
export const defaultSelectionProps = {
  top: { left: 0, top: 0, width: 0, height: 0 },
  center: { left: 0, top: 0, width: 0, height: 0 },
  bottom: { left: 0, top: 0, width: 0, height: 0 },
};

const SelectionView: React.FC<{ rect: Rect }> = ({ rect }) => (
  <div
    style={{
      position: "absolute",
      pointerEvents: "none",
      backgroundColor: "green",
      opacity: ".4",
      ...rect,
    }}
  />
);
export function Selection(props: { top: Rect; center: Rect; bottom: Rect }) {
  return (
    <span>
      <SelectionView rect={props.top} />
      <SelectionView rect={props.center} />
      <SelectionView rect={props.bottom} />
    </span>
  );
}
