/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />

import ReactDOM from "./deps/react-dom.ts";

let loading = true;

globalThis.addEventListener("DOMContentLoaded", () => {
  loading = false;
});

export function render(element: React.ReactElement) {
  // ページの読み込み中に呼ばれたら遅延する
  if (loading) {
    globalThis.addEventListener("DOMContentLoaded", () => render(element));
    return;
  }
  const dom = document.getElementById("react-root");
  ReactDOM.render(element, dom);
}
