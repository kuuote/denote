/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />

import {
  applyCommit,
  Change,
  Commit,
  makeChanges,
  Revision,
} from "./commit.ts";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "./deps/react.ts";
import { equal } from "./deps/std/asserts.ts";
import * as uuid from "./deps/std/uuidv1.ts";
import { TextInput } from "./input.tsx";
import {
  defaultPosition,
  getCharDOM,
  LineView,
  positionFromElement,
} from "./line.tsx";
import { getAbsoluteRect } from "./rect.ts";
import {
  defaultSelection,
  defaultSelectionProps,
  SelectionView,
} from "./selection.tsx";
import { CursorView, Line, Position, Selection } from "./types.ts";
import { clamp, countIndent, selectedTextFromLines } from "./util.ts";

type HandlerMap = {
  commit: Commit;
};

type Handlers = {
  [K in keyof HandlerMap]?: ((value: HandlerMap[K]) => void)[];
};

/* Editor logic */
export class Editor {
  cursor = defaultPosition;
  selection = defaultSelection;

  handlers: Handlers = {};

  // rendering callback
  // must be set on view
  callback = () => console.log("callback was not defined");

  constructor(private revision: Revision) {}

  on<K extends keyof HandlerMap>(
    type: K,
    handler: (value: HandlerMap[K]) => void,
  ) {
    this.handlers[type] ??= [];
    this.handlers[type]?.push(handler);
  }

  emit<K extends keyof HandlerMap>(type: K, value: HandlerMap[K]) {
    for (const handler of this.handlers[type] ?? []) {
      handler(value);
    }
  }

  commitChanges(changes: Change[]) {
    const commit: Commit = {
      id: String(uuid.generate()),
      parentID: this.revision.id,
      changes,
    };
    this.revision = applyCommit(this.revision, commit);
    this.emit("commit", commit);
  }

  getLines(): Line[] {
    return this.revision.lines;
  }

  setCallback(callback: () => void) {
    this.callback = callback;
  }

  setCursor(cursor: Position) {
    this.cursor = cursor;
    this.callback();
  }

  setSelection(selection: Selection) {
    this.selection = selection;
    this.callback();
  }

  moveCursor(forward: boolean) {
    const cursor = this.cursor;
    const lines = this.getLines();
    if (cursor.column === (forward ? lines[cursor.line].text.length : 0)) {
      if (cursor.line === (forward ? lines.length - 1 : 0)) {
        return;
      }
      this.setCursor({
        line: cursor.line + (forward ? 1 : -1),
        column: forward ? 0 : lines[cursor.line - 1].text.length,
      });
    } else {
      this.setCursor({
        line: cursor.line,
        column: cursor.column + (forward ? 1 : -1),
      });
    }
  }

  /** ??????????????????????????????????????????????????? */
  input(str: string) {
    const lines = this.getLines();
    if (this.selection.start.line === -1) {
      const currentCursorLine = lines.at(this.cursor.line);
      if (!currentCursorLine) return;
      const cursorLine = currentCursorLine;

      const indentStr = cursorLine.text.slice(0, countIndent(cursorLine.text));
      const a = cursorLine.text.slice(0, this.cursor.column);
      const b = cursorLine.text.slice(
        this.cursor.column,
        cursorLine.text.length,
      );
      const newLines = (a +
        str.split("\n").map((line, index) =>
          index === 0 ? line : `${indentStr}${line}`
        ).join("\n") +
        b).split("\n");

      this.commitChanges([
        ...makeChanges(lines, this.cursor.line, this.cursor.line, newLines),
      ]);
      this.cursor = {
        line: this.cursor.line + newLines.length - 1,
        column: (newLines.at(-1)?.length ?? 0) - b.length,
      };
    } else {
      const [start, , end] = selectedTextFromLines(lines, this.selection);
      const newLines = (start + str + end).split("\n");
      this.commitChanges([
        ...makeChanges(
          lines,
          this.selection.start.line,
          this.selection.end.line,
          newLines,
        ),
      ]);
      this.cursor = {
        line: this.selection.start.line + (newLines.length - 1),
        column: newLines[newLines.length - 1].length - end.length,
      };
      this.selection = defaultSelection;
    }
    this.callback();
  }

  backSpace() {
    if (this.selection !== defaultSelection) {
      this.input("");
      return;
    }
    const lines = this.getLines();
    const currentLine = lines[this.cursor.line];
    if (this.cursor.column === 0) {
      if (this.cursor.line === 0) {
        return;
      }
      const previousLine = lines[this.cursor.line - 1];
      this.commitChanges([
        ...makeChanges(lines, this.cursor.line - 1, this.cursor.line, [
          previousLine.text + currentLine.text,
        ]),
      ]);
      this.cursor = {
        line: this.cursor.line - 1,
        column: previousLine.text.length,
      };
    } else {
      const text = currentLine.text;
      this.commitChanges([
        ...makeChanges(lines, this.cursor.line, this.cursor.line, [
          text.slice(0, this.cursor.column - 1) +
          text.slice(this.cursor.column, text.length),
        ]),
      ]);
      this.cursor = {
        line: this.cursor.line,
        column: this.cursor.column - 1,
      };
    }
    this.callback();
  }
}

export function EditorView(props: { editor: Editor }): JSX.Element {
  const { editor } = props;
  const { cursor, selection } = editor;

  // ??????????????????????????????????????????
  const [, reRender] = useState(1);
  useEffect(() => {
    editor.setCallback(() => reRender(Math.random()));
  }, []);

  const lines = props.editor.getLines();
  const [cursorView, setCursorView] = useState<CursorView>({
    left: 0,
    top: 0,
    height: 0,
  });

  // ?????????????????????????????????????????????????????????????????????????????????????????????
  const selectionStart = useRef(defaultPosition);
  const [selectionView, setSelectionView] = useState(defaultSelectionProps);

  const handleClick = useCallback((e: React.MouseEvent<Element>) => {
    const t = e.target as Element;
    const anchor = t.closest("a");
    if (anchor != null) {
      console.log(anchor);
      if (anchor.closest(".cursor-line") != null) {
        console.log("prevent");
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }, []);

  /** ???????????????????????????????????????????????????
   *
   * ??????????????????????????????
   */
  const handleMouseDown = useCallback((e: React.MouseEvent<Element>) => {
    const pos = positionFromElement(e.target as Element, e.clientX, e.clientY);

    const t = e.target as Element;
    const anchor = t.closest("a");
    if (anchor != null && pos.line !== editor.cursor.line) {
      e.preventDefault();
      return;
    }

    editor.setCursor(pos);
    editor.setSelection(defaultSelection);
    // ????????????????????????????????????
    selectionStart.current = pos;
    setSelectionView(defaultSelectionProps);
  }, []);

  // ?????????????????????
  useLayoutEffect(() => {
    const len = lines[cursor.line]?.text.length ?? -1;
    // ??????????????????????????????????????????????????? DOM ??????????????? len - 1 ????????????
    // ????????? len - 1 ?????????????????? ??????????????? -1 ??????????????????????????? 0 ????????????
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
    // ?????????????????????????????????????????????????????????????????????????????????????????????????????????
    const absoluteX = rect.left + (cursor.column === len ? rect.width : 0);
    const absoluteY = rect.top;
    setCursorView({
      left: absoluteX,
      top: absoluteY,
      height: rect.height,
    });
  }, [cursor]);

  /** ???????????????????????????????????????????????? */
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
      editor.setSelection(defaultSelection);
    } else {
      editor.setSelection({
        start: selection[0],
        end: selection[1],
      });
    }
    editor.setCursor(pos);
  }, []);

  // ?????????????????????
  useLayoutEffect(() => {
    const startlen = lines[selection.start.line]?.text.length ?? -1;
    const startcol = clamp(0, selection.start.column, startlen - 1);
    const start = getCharDOM(selection.start.line, startcol);

    const endlen = lines[selection.end.line]?.text.length ?? -1;
    const endcol = clamp(0, selection.end.column, endlen - 1);
    const end = getCharDOM(selection.end.line, endcol);

    if (!start || !end) {
      setSelectionView(defaultSelectionProps);
      return;
    }
    const startRect = getAbsoluteRect(start);
    const endRect = getAbsoluteRect(end);
    // ????????????????????????????????????????????????????????????
    // ?????????startRect???endRect???????????????????????????????????????????????????????????????
    // ???????????????????????????????????????????????????????????????
    if (endRect.top < startRect.top + startRect.height / 2) {
      const view = {
        ...startRect,
        width: endRect.left + (selection.end.column === endlen
          // ????????????????????????????????????????????????????????????width?????????
          ? endRect.width
          : 0) -
          startRect.left,
      };
      setSelectionView({
        ...defaultSelectionProps,
        center: view,
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
      onClick={handleClick}
      onMouseDown={handleMouseDown}
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
      <SelectionView {...selectionView} />
      <TextInput editor={editor} cursorView={cursorView} />
      <span>
        {lines.map((line, index) => (
          <LineView
            key={line.id}
            line={line}
            lnum={index}
            cursor={index === editor.cursor.line}
          />
        ))}
      </span>
    </span>
  );
}
