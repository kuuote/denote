import { Line } from "./types.ts";
import { generate } from "./deps/std/uuidv1.ts";

type LineID = string;

type Insert = {
  type: "insert";
  /** このidで指定した行の前に挿入する
   *
   * 末尾に挿入する場合は`_end`を入れる
   */
  id: LineID;
  text: string;
  newlineID: LineID;
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

/** 特定範囲の行を書き換えるchangesを作る */
export function* makeChanges(
  lines: Line[],
  start: number,
  end: number,
  newLines: string[],
): Generator<Change, void, unknown> {
  if (start > end) {
    throw RangeError('"end" must be equal to or larger than "start"');
  }
  if (start < 0 || end < 0) {
    throw Error('"end" and "start" must be more than -1');
  }

  const insertLineID = lines.at(end + 1)?.id ?? "_end"; //挿入先 行ID

  if (end - start + 1 > newLines.length) {
    for (let i = 0; i < newLines.length; i++) {
      const text = newLines[i];
      if (lines[start + i].text === text) continue;
      yield {
        type: "update",
        id: lines[start + i].id,
        text,
      };
    }
    for (let i = start + newLines.length; i <= end; i++) {
      yield {
        type: "delete",
        id: lines[i].id,
      };
    }
  } else {
    for (let i = 0; i < end - start + 1; i++) {
      const text = newLines[i];
      if (lines[start + i].text === text) continue;
      yield {
        type: "update",
        id: lines[start + i].id,
        text,
      };
    }
    for (let i = end - start + 1; i < newLines.length; i++) {
      yield {
        type: "insert",
        id: insertLineID,
        newlineID: String(generate()),
        text: newLines[i],
      };
    }
  }
}

/** commitを適用して新しいrevisionをつくる */
export function applyCommit(revision: Revision, commit: Commit): Revision {
  if (revision.id !== commit.parentID) {
    throw Error("commit rejected");
  }
  const lines = [...revision.lines];
  for (const change of commit.changes) {
    const idx = lines.findIndex((line) => line.id === change.id);
    if (change.type === "insert") {
      // 指定した番号の行の前に挿入する
      lines.splice(idx === -1 ? lines.length : idx, 0, {
        text: change.text,
        id: change.newlineID,
      });
    } else if (change.type === "update") {
      lines[idx] = { ...lines[idx], text: change.text };
    } else if (change.type === "delete") {
      lines.splice(idx, 1);
    }
  }
  return {
    id: commit.id,
    previous: revision,
    lines,
  };
}
