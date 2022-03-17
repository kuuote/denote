export function clamp(min: number, num: number, max: number) {
  return Math.max(min, Math.min(num, max));
}
