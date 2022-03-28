/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="dom" />

export type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export function getAbsoluteRect(element: Element): Rect {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
  };
}
