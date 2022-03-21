import { makeChanges } from "./commit.ts";
import { assertEquals, assertThrows } from "./deps/std/asserts.ts";
import { generate } from "./deps/std/uuidv1.ts";

Deno.test("makeChanges()", async (t) => {
  const lines = [
    "hoge",
    " huga",
    " hugehuge",
    "",
    "fuga",
    "piyo",
  ].map((text) => ({ text, id: String(generate()) }));

  const newLines = [
    " hugehuge",
    "  piyo",
    "piyopiyo",
  ];

  await t.step("1行だけ書き換える", async (t) => {
    for (let i = 0; i < lines.length; i++) {
      await t.step(
        `${i !== lines.length - 1 ? `${i}行目` : "最後の行"}を書き換える`,
        () => {
          assertEquals(
            [...makeChanges(lines, i, i, newLines)].map((change) =>
              change.type === "insert"
                ? { type: "insert", text: change.text, id: change.id }
                : change
            ),
            [
              ...(lines[i].text !== " hugehuge"
                ? [{ type: "update", id: lines[i].id, text: " hugehuge" }]
                : []),
              {
                type: "insert",
                id: lines.at(i + 1)?.id ?? "_end",
                text: "  piyo",
              },
              {
                type: "insert",
                id: lines.at(i + 1)?.id ?? "_end",
                text: "piyopiyo",
              },
            ],
          );
        },
      );
    }
  });

  await t.step("範囲指定に負数は不可", () => {
    assertThrows(() => [...makeChanges(lines, -1, 0, newLines)], Error);
    assertThrows(() => [...makeChanges(lines, 0, -1, newLines)], Error);
    assertThrows(() => [...makeChanges(lines, -1, -1, newLines)], Error);
  });

  await t.step("start <= end", () => {
    assertThrows(() => [...makeChanges(lines, 4, 3, newLines)], RangeError);
  });

  // 他に書くテスト
  // - 途中の複数行書き換え
  //   - 書き換え前後で行が増えるか減るかでも別々に試す
});

// applyCommitのテストも書く
