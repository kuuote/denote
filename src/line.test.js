import { getCharDOM } from "./line.tsx";
import { DOMParser } from "./deps/deno-dom.ts";
import { assertStrictEquals } from "./deps/std/asserts.ts";

Deno.test("getCharDOM()", () => {
  globalThis.document = new DOMParser().parseFromString(
    `<span class="l-0">
  <span class="c-0">あ</span>
  <span class="c-1">い</span>
  <span class="c-2">う</span>
  <span class="c-3">え</span>
</span>
<span class="l-1">
  <span class="c-0">お</span>
  <span class="c-1">か</span>
  <span class="c-2">き</span>
  <span class="c-3">く</span>
</span>
<span class="L-2">
  <span class="c-0">お</span>
  <span class="c-1">か</span>
  <span class="c-2">き</span>
  <span class="c-3">く</span>
</span>`,
    "text/html",
  );

  const char01 = getCharDOM(0, 1);
  assertStrictEquals(char01.getAttribute("class"), "c-1");
  assertStrictEquals(char01.textContent, "い");
  assertStrictEquals(getCharDOM(2, 1), undefined);
});
