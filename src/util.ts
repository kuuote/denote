import { Selection } from "./types.ts";

export function clamp(min: number, num: number, max: number) {
  return Math.max(min, Math.min(num, max));
}

export function countIndent(text: string) {
  return text.length - text.trimStart().length;
}

export type SelectedText = [start: string, selected: string, end: string];

export function selectedTextFromLines(
  lines: { text: string }[],
  selection: Selection,
): SelectedText {
  const text = lines.slice(
    selection.start.line,
    selection.end.line + 1,
  )
    .map((l) => l.text);

  const start = text[0].slice(0, selection.start.column);
  const end = text[text.length - 1].slice(selection.end.column);

  text[text.length - 1] = text[text.length - 1].slice(
    0,
    selection.end.column,
  );
  text[0] = text[0].slice(selection.start.column, text[0].length);

  const selected = text.join("\n");

  return [start, selected, end];
}
