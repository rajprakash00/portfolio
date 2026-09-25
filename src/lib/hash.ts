/** Deterministic 0..1 noise for generative layouts (stems, sprouts, glyphs).
 *  Accepts a number or a string seed, so specimens can key off a slug. */
export function hash(seed: number | string) {
  const n = typeof seed === "number" ? seed : seedFromString(seed);
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function seedFromString(value: string) {
  let n = 0;
  for (let i = 0; i < value.length; i += 1) {
    n = (n * 31 + value.charCodeAt(i)) % 100000;
  }
  return n;
}
