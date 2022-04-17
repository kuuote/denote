import { parseLine } from "./parseline.ts";
import { assertEquals } from "https://deno.land/std@0.135.0/testing/asserts.ts";

Deno.test({
  name: "parseLine()",
  fn() {
    const input = "text [bracket] `inlineCode` [* [strong] style] [[unknown]]";
    const expected = [0, [
      { "type": "character", "character": "t", "index": 0 },
      { "type": "character", "character": "e", "index": 1 },
      { "type": "character", "character": "x", "index": 2 },
      { "type": "character", "character": "t", "index": 3 },
      { "type": "character", "character": " ", "index": 4 },
      {
        "type": "bracket",
        "text": "[bracket]",
        "inner": [
          { "type": "character", "character": "[", "index": 5 },
          { "type": "character", "character": "b", "index": 6 },
          { "type": "character", "character": "r", "index": 7 },
          { "type": "character", "character": "a", "index": 8 },
          { "type": "character", "character": "c", "index": 9 },
          { "type": "character", "character": "k", "index": 10 },
          { "type": "character", "character": "e", "index": 11 },
          { "type": "character", "character": "t", "index": 12 },
          { "type": "character", "character": "]", "index": 13 },
        ],
      },
      { "type": "character", "character": " ", "index": 14 },
      {
        "type": "inlineCode",
        "inner": [
          { "type": "character", "character": "`", "index": 15 },
          { "type": "character", "character": "i", "index": 16 },
          { "type": "character", "character": "n", "index": 17 },
          { "type": "character", "character": "l", "index": 18 },
          { "type": "character", "character": "i", "index": 19 },
          { "type": "character", "character": "n", "index": 20 },
          { "type": "character", "character": "e", "index": 21 },
          { "type": "character", "character": "C", "index": 22 },
          { "type": "character", "character": "o", "index": 23 },
          { "type": "character", "character": "d", "index": 24 },
          { "type": "character", "character": "e", "index": 25 },
          { "type": "character", "character": "`", "index": 26 },
        ],
      },
      { "type": "character", "character": " ", "index": 27 },
      {
        "type": "decoration",
        "decorationType": "*",
        "inner": [
          { "type": "character", "character": "[", "index": 28 },
          { "type": "character", "character": "*", "index": 29 },
          { "type": "character", "character": " ", "index": 30 },
          {
            "type": "bracket",
            "text": "[strong]",
            "inner": [
              { "type": "character", "character": "[", "index": 31 },
              { "type": "character", "character": "s", "index": 32 },
              { "type": "character", "character": "t", "index": 33 },
              { "type": "character", "character": "r", "index": 34 },
              { "type": "character", "character": "o", "index": 35 },
              { "type": "character", "character": "n", "index": 36 },
              { "type": "character", "character": "g", "index": 37 },
              { "type": "character", "character": "]", "index": 38 },
            ],
          },
          { "type": "character", "character": " ", "index": 39 },
          { "type": "character", "character": "s", "index": 40 },
          { "type": "character", "character": "t", "index": 41 },
          { "type": "character", "character": "y", "index": 42 },
          { "type": "character", "character": "l", "index": 43 },
          { "type": "character", "character": "e", "index": 44 },
          { "type": "character", "character": "]", "index": 45 },
        ],
      },
      { "type": "character", "character": " ", "index": 46 },
      {
        "type": "unknown",
        "inner": [{ "type": "character", "character": "[", "index": 47 }, {
          "type": "bracket",
          "text": "[unknown]",
          "inner": [
            { "type": "character", "character": "[", "index": 48 },
            { "type": "character", "character": "u", "index": 49 },
            { "type": "character", "character": "n", "index": 50 },
            { "type": "character", "character": "k", "index": 51 },
            { "type": "character", "character": "n", "index": 52 },
            { "type": "character", "character": "o", "index": 53 },
            { "type": "character", "character": "w", "index": 54 },
            { "type": "character", "character": "n", "index": 55 },
            { "type": "character", "character": "]", "index": 56 },
          ],
        }, { "type": "character", "character": "]", "index": 57 }],
      },
    ]];
    const result = parseLine(input);
    assertEquals(result, expected);
  },
});
