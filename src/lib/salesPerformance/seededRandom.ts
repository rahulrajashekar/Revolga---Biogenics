// ─── SEEDED PRNG ───────────────────────────────────────────────────────────
// Small deterministic random generator (mulberry32) used only to *generate*
// this module's mock dataset once, at load time. Using a fixed seed instead
// of Math.random() keeps the generated numbers identical between the server
// render and the client render (avoids React hydration mismatches) and
// between reloads, which matters for a demo people will click through
// repeatedly.

export function mulberry32(seed: number) {
  let a = seed;
  return function random(): number {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Random integer in [min, max], inclusive. */
export function randInt(rnd: () => number, min: number, max: number): number {
  return Math.floor(rnd() * (max - min + 1)) + min;
}

/** Random float in [min, max]. */
export function randFloat(rnd: () => number, min: number, max: number): number {
  return rnd() * (max - min) + min;
}
