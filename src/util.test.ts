import { assertEquals, assertStrictEquals } from "./deps/std/asserts.ts";
import { clamp, countIndent } from "./util.ts";
import { Selection } from "./types.ts";
import { selectedTextFromLines } from "./util.ts";

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

function mkSelection(...args: number[]): Selection {
  return {
    start: {
      line: args[0],
      column: args[1],
    },
    end: {
      line: args[2],
      column: args[3],
    },
  };
}

Deno.test("selectedTextFromLines()", () => {
  const lines = ["one", "two", "three"].map((s) => ({ text: s }));
  const tests: [number[], string[]][] = [
    [[2, 1, 2, 4], ["t", "hre", "e"]],
    [[0, 2, 2, 2], ["on", "e\ntwo\nth", "ree"]],
  ];
  for (const [sel, expected] of tests) {
    const actual = selectedTextFromLines(lines, mkSelection(...sel));
    assertEquals(actual, expected);
  }
});
