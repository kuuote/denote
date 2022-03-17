import { clamp } from "./util.ts";
import { assertStrictEquals } from "./deps/std/asserts.ts";

Deno.test("clamp()", () => {
  assertStrictEquals(clamp(34, 56, 43.0), 43.0);
  assertStrictEquals(clamp(-3, -56, 43), -3);
});
