import React from "./deps/react.ts";
import ReactDOM from "./deps/react-dom.ts";
import { EditorView } from "./editor.tsx";

const text = ["", "foo", " bar", "  baz"];

const root = document.getElementById("react-root");
ReactDOM.render(<EditorView lines={text} />, root);
