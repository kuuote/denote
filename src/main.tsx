import ReactDOM from "./deps/react-dom.ts";
import React from "./deps/react.ts";
import * as uuid from "./deps/std/uuidv1.ts";
import { Editor, EditorView } from "./editor.tsx";

const lines = ["", "foo", " bar", "  baz"].map((e) => ({
  text: e,
  id: String(uuid.generate()),
}));

const editor = new Editor({
  id: String(uuid.generate()),
  lines,
});

window.editor = editor;

const root = document.getElementById("react-root");
ReactDOM.render(<EditorView editor={editor} />, root);
