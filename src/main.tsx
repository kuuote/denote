import ReactDOM from "./deps/react-dom.ts";
import React from "./deps/react.ts";
import * as uuid from "./deps/std/uuidv1.ts";
import { Editor, EditorView } from "./editor.tsx";

const lines = [
  "[denote https://github.com/kuuote/denote]のデモです",
  "\t[https://scrapbox.io/help-jp/ブラケティング Scrapboxの記法]に似た物をいくつかサポートしています",
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

// deno-lint-ignore no-explicit-any
(window as any).editor = editor;

const root = document.getElementById("react-root");
ReactDOM.render(<EditorView editor={editor} />, root);
