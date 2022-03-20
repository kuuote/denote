import { Line } from "../types.ts";

type LineID = string;

type Insert = {
  type: "insert";
  id: LineID;
  text: string;
  previousID: LineID;
};

type Update = {
  type: "update";
  id: LineID;
  text: string;
};

type Delete = {
  type: "delete";
  id: LineID;
};

export type Change = Insert | Update | Delete;

type CommitID = string;

export type Commit = {
  id: CommitID;
  parentID: CommitID;
  changes: Change[];
};

export type Revision = {
  id: CommitID;
  previous?: Revision;
  lines: Line[];
};
