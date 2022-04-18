import { $ } from "./deps/pazza.ts";

// まず文字列を木にする

type Parsed = string | { type: string; inner: Parsed[] };

const $node: $.IParser<Parsed> = $.lazy(() =>
  $.choice(
    $bracket,
    $inlineCode,
    $.anyChar(),
  )
);

const $bracket: $.IParser<Parsed> = $.map(
  $.between(
    $.char("["),
    $.char("]"),
    $.manyUntil(
      $node,
      $.char("]"),
    ),
  ),
  (inner) => ({
    type: "bracket",
    inner: ["[", ...inner, "]"],
  }),
);

const $inlineCode = $.map(
  $.between(
    $.char("`"),
    $.char("`"),
    $.manyUntil(
      $.anyChar(),
      $.char("`"),
    ),
  ),
  (inner) => ({
    type: "inlineCode",
    inner: ["`", ...inner, "`"],
  }),
);

const $line = $.many0($node);

// 木を更に変換する
// indexを生やしてbracketのタイプを埋める

type Character = {
  type: "character";
  character: string;
  index: number;
  notation: boolean; // 通常は隠れる記法部分
};

type BaseNode = {
  inner: IndexedNode[];
};

type Anchor = {
  type: "anchor";
  url: string;
};

type Bracket = {
  type: "bracket";
  text: string;
};

type Decoration = {
  type: "decoration";
  decorationType: string;
};

type PlainNode = {
  type:
    | "inlineCode"
    | "unknown";
};

export type IndexedNode =
  | (
    | Anchor
    | Bracket
    | Decoration
    | PlainNode
  )
    & BaseNode
  | Character;

const urlRegexp = /\[(.*?)(https?:\/\/[^\s\]]+)(.*)\]/;

function processNode(parsed: Parsed, counter: () => number): IndexedNode {
  if (typeof parsed === "string") {
    return {
      type: "character",
      character: parsed,
      index: counter(),
      notation: false,
    };
  } else {
    const inner = parsed.inner.map((p) => processNode(p, counter));

    // 以下は囲い付きノード
    (inner[0] as Character).notation = true;
    (inner[inner.length - 1] as Character).notation = true;
    if (parsed.type === "inlineCode") {
      return {
        type: "inlineCode",
        inner,
      };
    }
    if (String(parsed.inner[1]).match(/[*/-]/) && parsed.inner[2] === " ") {
      return {
        type: "decoration",
        decorationType: String(parsed.inner[1]),
        inner,
      };
    }
    if (inner.every((n): n is Character => n.type === "character")) {
      const text = inner.map((n) => n.character).join("");

      const m = text.match(urlRegexp);

      if (m != null) {
        const url = m[2];
        const label = (m[1] + m[3]).trim();
        const labelStart = text.indexOf(label);
        const labelEnd = labelStart + label.length - 1;
        if (label !== "") {
          for (let i = 0; i < inner.length; i++) {
            inner[i].notation = i < labelStart || labelEnd < i;
          }
        }
        return {
          type: "anchor",
          url,
          inner,
        };
      }

      return {
        type: "bracket",
        text,
        inner,
      };
    }
    return {
      type: "unknown",
      inner,
    };
  }
}

export function parseLine(
  line: string,
  codeBlockIndent = Number.POSITIVE_INFINITY,
): [indent: number, node: IndexedNode[]] {
  const txt = line.trimStart();
  const indent = line.length - txt.length;
  if (indent < codeBlockIndent) {
    // return code block
  }
  const parsed = $line(txt);
  if (!parsed.ok) {
    throw Error("parse failed: " + line);
  }
  const counter = (() => {
    let count = indent;
    return () => count++;
  })();
  return [indent, parsed.output.map((p) => processNode(p, counter))];
}
