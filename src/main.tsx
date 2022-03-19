import ReactDOM from "./deps/react-dom.ts";
import React from "./deps/react.ts";
import { generate } from "./deps/std/uuidv1.ts";
import { EditorView } from "./editor.tsx";

const lines = ["", "foo", " bar", "  baz"].map((e) => ({
  text: e,
  id: String(generate()),
}));

const root = document.getElementById("react-root");
ReactDOM.render(<EditorView lines={text} />, root);
