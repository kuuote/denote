import ReactDOM from "./deps/react-dom.ts";
import React from "./deps/react.ts";
import * as uuid from "./deps/std/uuidv1.ts";
import { Editor, EditorView } from "./editor.tsx";

const lines = [
  "[denote https://github.com/kuuote/denote]のデモです",
  "\tScrapboxに似た記法をいくつかサポートしています",
  "\t\t[リンク]",
  "\t\t[* 太字]",
  "\t\t[/ 斜体]",
  "\t\t[- 打ち消し]",
  "\t\t`コードブロック`",
]
  .map((e) => ({
    text: e,
    id: String(uuid.generate()),
  }));

const editor = new Editor({
  id: String(uuid.generate()),
  lines,
});

const root = document.getElementById("react-root");
ReactDOM.render(<EditorView editor={editor} />, root);
