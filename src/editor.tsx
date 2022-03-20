/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />

import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "./deps/react.ts";
import { equal } from "./deps/std/asserts.ts";
import * as uuid from "./deps/std/uuidv1.ts";
import { LineView } from "./line.tsx";
import { Line, Position, Selection } from "./types.ts";
import { Change, Commit, Revision } from "./types/commit.ts";
import { clamp } from "./util.ts";

const defaultPosition: Position = {
  line: -1,
  column: -1,
};

const defaultSelection: Selection = {
  start: defaultPosition,
  end: defaultPosition,
};

/* Editor logic */

function applyCommit(revision: Revision, commit: Commit): Revision {
  if (revision.id !== commit.parentID) {
    throw Error("commit rejected");
  }
  const lines = [...revision.lines];
  for (const change of commit.changes) {
    const idx = lines.findIndex((line) => line.id === change.id);
    if (change.type === "insert") {
      lines.splice(idx === -1 ? lines.length : idx, 0, {
        text: change.text,
        id: change.id,
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

class CoreEditor {
  revision: Revision;

  constructor(revision: Revision) {
    this.revision = revision;
  }

  apply(changes: Change[]) {
    this.revision = applyCommit(this.revision, {
      id: String(uuid.generate()),
      parentID: this.revision.id,
      changes,
    });
  }
}

export class Editor {
  #core: CoreEditor;
  cursor = defaultPosition;
  selection = defaultSelection;

  // rendering callback
  // must be set on view
  callback = () => console.log("callback was not defined");

  constructor(revision: Revision) {
    this.#core = new CoreEditor(revision);
  }

  getLines(): Line[] {
    return this.#core.revision.lines;
  }

  setCallback(callback: () => void) {
    this.callback = callback;
  }

  setCursor(cursor?: Position) {
    this.cursor = cursor ?? defaultPosition;
    this.callback();
  }

  setSelection(selection?: Selection) {
    this.selection = selection ?? defaultSelection;
    this.callback();
  }

  input(str: string) {
    const changes: Change[] = [];
    const lines = this.getLines();
    let cursorLine = lines[this.cursor.line];
    if (cursorLine == null) return;
    const insertLineID = lines[this.cursor.line + 1]?.id ??
      "_end";
    const cursor = { ...this.cursor };
    for (
      const { line, newline } of str.split("\n")
        .map((line, index, self) => ({
          line,
          newline: index !== self.length - 1,
        }))
    ) {
      const a = cursorLine.text.slice(0, cursor.column);
      const b = cursorLine.text.slice(cursor.column, cursorLine.text.length);
      if (newline) {
        const text = a + line;
        const update: Change = {
          type: "update",
          id: cursorLine.id,
          text,
        };
        const indentLength = a.length - a.trimStart().length;
        const insert: Change = {
          type: "insert",
          id: String(uuid.generate()),
          text: a.slice(0, indentLength) + b,
          previousID: insertLineID,
        };
        changes.push(update, insert);
        cursor.line += 1;
        cursor.column = indentLength;
        cursorLine = {
          id: insert.id,
          text: insert.text,
        };
      } else {
        const update: Change = {
          type: "update",
          id: cursorLine.id,
          text: a + line + b,
        };
        changes.push(update);
        cursor.column += line.length;
      }
    }
    this.#core.apply(changes);
    this.cursor = cursor;
    this.callback();
  }
}

/* Editor View */

function positionFromElement(
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

type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

function getAbsoluteRect(element: Element): Rect {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
  };
}

function getCharDOM(line: number, column: number): Element | undefined {
  const l = document.getElementsByClassName(`l-${line}`);
  const c = l[0]?.getElementsByClassName(`c-${column}`);
  return c?.[0];
}

export function SelectionView(props: { rect: Rect }) {
  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "none",
        backgroundColor: "green",
        opacity: ".4",
        ...props.rect,
      }}
    />
  );
}

export function EditorView(props: { lines: Line[] }): JSX.Element {
  const { lines } = props;

  const [cursor, setCursor] = useState(defaultPosition);
  const [cursorView, setCursorView] = useState({
    left: 0,
    top: 0,
    height: 0,
  });

  // 選択によってカーソルが移動するため選択範囲の始点を格納しておく
  const selectionStart = useRef(defaultPosition);
  const [selection, setSelection] = useState(defaultSelection);
  const [selectionView, setSelectionView] = useState({
    top: { left: 0, top: 0, width: 0, height: 0 },
    center: { left: 0, top: 0, width: 0, height: 0 },
    bottom: { left: 0, top: 0, width: 0, height: 0 },
  });

  /* カーソルの描画 */

  const handleClick = useCallback((e: React.MouseEvent<Element>) => {
    const pos = positionFromElement(e.target as Element, e.clientX, e.clientY);
    setCursor(pos);
    // 選択範囲の保持とリセット
    selectionStart.current = pos;
    setSelectionView({
      top: { left: 0, top: 0, width: 0, height: 0 },
      center: { left: 0, top: 0, width: 0, height: 0 },
      bottom: { left: 0, top: 0, width: 0, height: 0 },
    });
  }, []);

  useLayoutEffect(() => {
    const len = lines[cursor.line]?.text.length ?? -1;
    // カーソル行が末尾にある際は該当する DOM が無いので len - 1 で丸める
    // 単純に len - 1 するだけでは 空行の時に -1 になってしまうため 0 で丸める
    const col = clamp(0, cursor.column, len - 1);
    const char = getCharDOM(cursor.line, col);
    if (char == null) {
      console.log("cursorView: char == null");
      setCursorView({
        left: 0,
        top: 0,
        height: 0,
      });
      return;
    }
    const rect = getAbsoluteRect(char);
    // 末尾の時は要素の幅を足すことで右端にカーソルが置かれているように見せる
    const absoluteX = rect.left + (cursor.column === len ? rect.width : 0);
    const absoluteY = rect.top;
    setCursorView({
      left: absoluteX,
      top: absoluteY,
      height: rect.height,
    });
  }, [cursor]);

  /* 選択範囲の描画 */

  const handleMouseMove = useCallback((e: React.MouseEvent<Element>) => {
    if (e.buttons !== 1) {
      return;
    }
    const pos = positionFromElement(
      e.target as Element,
      e.clientX,
      e.clientY,
    );
    if (pos.line === -1) return;
    const selection = [pos, selectionStart.current].sort((a, b) => {
      if (a.line !== b.line) {
        return a.line - b.line;
      }
      return a.column - b.column;
    });
    if (equal(selection[0], selection[1])) {
      setSelection(defaultSelection);
    } else {
      setSelection({
        start: selection[0],
        end: selection[1],
      });
    }
    setCursor(pos);
  }, []);

  useLayoutEffect(() => {
    const startlen = lines[selection.start.line]?.text.length ?? -1;
    const startcol = clamp(0, selection.start.column, startlen - 1);
    const start = getCharDOM(selection.start.line, startcol);

    const endlen = lines[selection.end.line]?.text.length ?? -1;
    const endcol = clamp(0, selection.end.column, endlen - 1);
    const end = getCharDOM(selection.end.line, endcol);

    if (!start || !end) {
      setSelectionView({
        top: { left: 0, top: 0, width: 0, height: 0 },
        center: { left: 0, top: 0, width: 0, height: 0 },
        bottom: { left: 0, top: 0, width: 0, height: 0 },
      });
      return;
    }
    const startRect = getAbsoluteRect(start);
    const endRect = getAbsoluteRect(end);
    // 要素のサイズ次第で微細な差があるため吸収
    // これ、startRectとendRectが衝突してるみたいな条件でもいいかもしれん
    // 単純な衝突判定じゃだめなので中間値を取るか
    if (endRect.top < startRect.top + startRect.height / 2) {
      const view = {
        ...startRect,
        width: endRect.left + (selection.end.column === endlen
          // 末尾にいる時は前の要素を参照しているためwidth分足す
          ? endRect.width
          : 0) -
          startRect.left,
      };
      setSelectionView({
        top: { left: 0, top: 0, width: 0, height: 0 },
        center: view,
        bottom: { left: 0, top: 0, width: 0, height: 0 },
      });
    } else {
      const lineView = document.getElementsByClassName("line").item(0)!;
      const lineRect = getAbsoluteRect(lineView);
      const topLeft = startRect.left +
        (selection.start.column === startlen ? startRect.width : 0);
      const top = {
        ...startRect,
        left: topLeft,
        width: lineRect.left + lineRect.width - (topLeft),
      };
      const center = {
        ...lineRect,
        top: startRect.top + startRect.height,
        height: endRect.top - (startRect.top + startRect.height),
      };
      const bottom = {
        ...endRect,
        left: lineRect.left,
        width: endRect.left - lineRect.left +
          (selection.end.column === endlen ? endRect.width : 0),
      };
      setSelectionView({
        top,
        center,
        bottom,
      });
    }
  }, [selection]);

  return (
    <span
      className="editor"
      onMouseDown={handleClick}
      onMouseMove={handleMouseMove}
    >
      <span
        className="cursor"
        style={{
          left: cursorView.left,
          top: cursorView.top,
          height: `${cursorView.height}px`,
        }}
      >
      </span>
      <span>
        <SelectionView rect={selectionView.top} />
        <SelectionView rect={selectionView.center} />
        <SelectionView rect={selectionView.bottom} />
      </span>
      <textarea
        className="input"
        style={{
          position: "absolute",
          left: cursorView.left,
          top: cursorView.top,
          width: 1,
          height: cursorView.height,
          lineHeight: cursorView.height,
          opacity: 0,
        }}
        onChange={onChange}
        spellCheck="false"
        wrap="off"
      >
      </textarea>
      <span>
        {lines.map((line, index) => (
          <LineView
            line={line}
            lnum={index}
          />
        ))}
      </span>
    </span>
  );
}
