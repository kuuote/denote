/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />

import React from "./deps/react.ts";
import { equal } from "./deps/std/asserts.ts";
import { Line } from "./line.tsx";
import { Position, Selection } from "./types.tsx";

const { useLayoutEffect, useState, useRef } = React;

const defaultPosition: Position = {
  line: -1,
  column: -1,
};

const defaultSelection: Selection = {
  start: defaultPosition,
  end: defaultPosition,
};

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

function getCharDOM(line: number, column: number) {
  return document.getElementsByClassName(
    `l-${line} c-${column}`,
  ).item(0);
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

export function Editor(props: { lines: string[] }): JSX.Element {
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

  const handleClick = (e: React.MouseEvent<Element>) => {
    const pos = positionFromElement(e.target as Element, e.clientX, e.clientY);
    setCursor(pos);
    // 選択範囲の保持とリセット
    selectionStart.current = pos;
    setSelectionView({
      top: { left: 0, top: 0, width: 0, height: 0 },
      center: { left: 0, top: 0, width: 0, height: 0 },
      bottom: { left: 0, top: 0, width: 0, height: 0 },
    });
  };

  useLayoutEffect(() => {
    const len = props.lines[cursor.line]?.length ?? -1;
    const col = cursor.column;
    const char = getCharDOM(cursor.line, Math.min(col, len - 1));
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
    const absoluteX = rect.left + (col === len ? rect.width : 0);
    const absoluteY = rect.top;
    setCursorView({
      left: absoluteX,
      top: absoluteY,
      height: rect.height,
    });
  }, [cursor]);

  /* 選択範囲の描画 */

  const handleMouseMove = (e: React.MouseEvent<Element>) => {
    if (e.buttons !== 1) {
      return;
    }
    const pos = positionFromElement(
      e.target as Element,
      e.clientX,
      e.clientY,
    );
    if (pos.line === -1) {
      return;
    }
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
  };

  useLayoutEffect(() => {
    const startlen = Math.min(
      (props.lines[selection.start.line]?.length ?? 0) - 1,
      selection.start.column,
    );
    const start = getCharDOM(selection.start.line, startlen);
    const endlen = Math.min(
      (props.lines[selection.end.line]?.length ?? 0) - 1,
      selection.end.column,
    );
    const end = getCharDOM(selection.end.line, endlen);
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
        width: endRect.left + (endlen + 1 === selection.end.column
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
      const lineView = document.querySelector(".line");
      const lineRect = getAbsoluteRect(lineView);
      const topLeft = startRect.left +
        (startlen + 1 === selection.start.column ? startRect.width : 0);
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
          (endlen + 1 === selection.end.column ? endRect.width : 0),
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
      style={{
        userSelect: "none",
      }}
      onMouseDown={handleClick}
      onMouseMove={handleMouseMove}
    >
      <span
        className="cursor"
        style={{
          position: "absolute",
          backgroundColor: "black",
          left: cursorView.left,
          top: cursorView.top,
          width: "1px",
          height: `${cursorView.height}px`,
        }}
      >
      </span>
      <span>
        <SelectionView rect={selectionView.top} />
        <SelectionView rect={selectionView.center} />
        <SelectionView rect={selectionView.bottom} />
      </span>
      <span>
        {props.lines.map((line, index) => <Line line={line} lnum={index} />)}
      </span>
    </span>
  );
}
