import React from "./deps/react.ts";
import ReactDOM from "./deps/react-dom.ts";
import { Editor } from "./editor.tsx";

const text = ["", "foo", " bar", "  baz"];

const root = document.getElementById("react-root");
ReactDOM.render(<Editor lines={text} />, root);
