import { clamp, countIndent } from "./util.ts";
import { assertStrictEquals } from "./deps/std/asserts.ts";

Deno.test("clamp()", () => {
  assertStrictEquals(clamp(34, 56, 43.0), 43.0);
  assertStrictEquals(clamp(-3, -56, 43), -3);
});

Deno.test("countIndent()", () => {
  assertStrictEquals(countIndent("foo"), 0);
  assertStrictEquals(countIndent(" bar"), 1);
  assertStrictEquals(countIndent("  baz"), 2);
  assertStrictEquals(countIndent("　 hoge"), 2);
  assertStrictEquals(countIndent(" \tfuga"), 2);
});
