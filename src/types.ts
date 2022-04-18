export type Position = {
  line: number;
  column: number;
};

export type Line = {
  text: string;
  id: string;
  cache?: {
    key: string;
    element: JSX.Element;
  };
};

export type CursorView = {
  left: number;
  top: number;
  height: number;
};

export type Selection = {
  start: Position;
  end: Position;
};
