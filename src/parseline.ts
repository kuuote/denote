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
};

type BaseNode = {
  inner: IndexedNode[];
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

type TextNode = {
  type: "bracket";
  text: string;
};

export type IndexedNode =
  | (
    | Decoration
    | PlainNode
    | TextNode
  )
    & BaseNode
  | Character;

function processNode(parsed: Parsed, counter: () => number): IndexedNode {
  if (typeof parsed === "string") {
    return {
      type: "character",
      character: parsed,
      index: counter(),
    };
  } else {
    const inner = parsed.inner.map((p) => processNode(p, counter));
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
    if (parsed.inner.every((v): v is string => typeof v === "string")) {
      const text = parsed.inner.join("");
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
