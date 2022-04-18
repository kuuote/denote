/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />

import { applyCommit, Change, makeChanges, Revision } from "./commit.ts";
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

/* Editor logic */
export class Editor {
  cursor = defaultPosition;
  selection = defaultSelection;

  // rendering callback
  // must be set on view
  callback = () => console.log("callback was not defined");

  constructor(private revision: Revision) {}

  commitChanges(changes: Change[]) {
    this.revision = applyCommit(this.revision, {
      id: String(uuid.generate()),
      parentID: this.revision.id,
      changes,
    });
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

  /** 現在のカーソル位置に文字を流し込む */
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

  // いい方法があったら差し替える
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

  // 選択によってカーソルが移動するため選択範囲の始点を格納しておく
  const selectionStart = useRef(defaultPosition);
  const [selectionView, setSelectionView] = useState(defaultSelectionProps);

  /** クリックした位置にカーソルを動かす
   *
   * 同時に選択範囲を消す
   */
  const handleClick = useCallback((e: React.MouseEvent<Element>) => {
    const pos = positionFromElement(e.target as Element, e.clientX, e.clientY);
    editor.setCursor(pos);
    editor.setSelection(defaultSelection);
    // 選択範囲の保持とリセット
    selectionStart.current = pos;
    setSelectionView(defaultSelectionProps);
  }, []);

  // カーソルの描画
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

  /** カーソル移動で選択範囲を変更する */
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

  // 選択範囲の描画
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
