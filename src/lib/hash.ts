/** Deterministic 0..1 noise for generative layouts (stems, sprouts, glyphs). */
export function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}
