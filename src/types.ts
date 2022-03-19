export type Position = {
  line: number;
  column: number;
};

export type Selection = {
  start: Position;
  end: Position;
};

export type Line = {
  text: string;
  id: string;
};
