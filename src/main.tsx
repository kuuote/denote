import React from "./deps/react.ts";
import { Editor } from "./editor.tsx";
import { render } from "./render.ts";

const text = ["foo", " bar", "  baz"];

render(<Editor lines={text} />);
