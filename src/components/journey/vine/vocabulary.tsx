/**
 * The vine's shared visual vocabulary. The journey vine and the projects
 * herbarium both mount these shapes, re-foliated by the current season, so the
 * whole site reads as one garden.
 */
import { css } from "styled-components";

import type { Season } from "@/lib/season";

export function BloomShape({ season }: { season: Season }) {
  if (season === "winter") {
    return (
      <g className="bloom-inner frost">
        <line x1="-7" y1="0" x2="7" y2="0" />
        <line x1="0" y1="-7" x2="0" y2="7" />
        <line x1="-5" y1="-5" x2="5" y2="5" />
        <line x1="-5" y1="5" x2="5" y2="-5" />
      </g>
    );
  }
  if (season === "autumn") {
    return (
      <g className="bloom-inner pod">
        <ellipse cx="0" cy="-6" rx="4.6" ry="6.4" />
        <line x1="0" y1="0" x2="0" y2="9" />
        <circle cx="0" cy="10.5" r="2" />
      </g>
    );
  }
  const petals = season === "spring" ? 5 : 6;
  return (
    <g className="bloom-inner petals">
      {Array.from({ length: petals }).map((_, index) => (
        <ellipse
          key={index}
          cx="0"
          cy="-6.4"
          rx={season === "spring" ? 4.4 : 3.6}
          ry={season === "spring" ? 6.6 : 5.4}
          transform={`rotate(${(360 / petals) * index})`}
        />
      ))}
      <circle className="bloom-core" r="2.6" />
    </g>
  );
}

/**
 * Ink for BloomShape. Consumers own the reveal: the vine keys it off scroll,
 * the specimen off viewport entry.
 */
export const bloomInk = css`
  .bloom-inner {
    transform-box: fill-box;
    transform-origin: center;
  }

  .petals ellipse {
    fill: var(--vine-bloom);
    fill-opacity: 0.92;
    stroke: color-mix(in srgb, var(--vine-bloom) 62%, var(--ink));
    stroke-width: 0.4;
  }

  .bloom-core {
    fill: var(--accent-ink);
    fill-opacity: 0.72;
  }

  .pod ellipse,
  .pod circle {
    fill: var(--vine-bloom);
    fill-opacity: 0.9;
  }

  .pod line {
    stroke: var(--vine);
    stroke-width: 1.4;
    stroke-linecap: round;
  }

  .frost line {
    stroke: var(--vine-bloom);
    stroke-width: 1.2;
    stroke-linecap: round;
  }
`;
