/**
 * Seasonal botanical specimens for the stack garden. Drawn in the same visual
 * vocabulary as the journey vine (leaf blade, bloom, pod, frosted twig) so the
 * page reads as one garden.
 */
import type { ReactElement } from "react";
import styled, { css } from "styled-components";

import type { Season } from "@/lib/season";
import { hash } from "@/lib/hash";

function SpringBlossom() {
  return (
    <>
      <path className="bg-stem" d="M2 12.5 C7.5 12.5 10.5 11.6 13.5 10.6" />
      <path
        className="bg-leaf"
        d="M4.6 12.2 C8 9.2 12 8.8 14.4 11.2 C12 13.8 8 14.2 4.6 12.2 Z"
      />
      <g transform="translate(18 7.6)">
        {[0, 1, 2, 3, 4].map((index) => (
          <ellipse
            key={index}
            className="bg-petal"
            cx="0"
            cy="-2.9"
            rx="1.9"
            ry="3"
            transform={`rotate(${index * 72})`}
          />
        ))}
        <circle className="bg-core" r="1.4" />
      </g>
      <path className="bg-stem" d="M13.5 10.6 C14.6 11.4 15.3 12.2 15.8 13.2" />
      <ellipse
        className="bg-bud"
        cx="16.2"
        cy="14.2"
        rx="1.4"
        ry="1.8"
        transform="rotate(24 16.2 14.2)"
      />
    </>
  );
}

function SpringBud() {
  return (
    <>
      <path className="bg-stem" d="M2 12.8 C8 12.8 12.5 11.6 16.4 10.2" />
      <path
        className="bg-leaf"
        d="M4.4 12.4 C7 9.6 10.6 9.4 12.6 11.2 C10.6 13.6 7 14 4.4 12.4 Z"
      />
      <g transform="translate(18.4 8.6) rotate(22)">
        <ellipse className="bg-bud" cx="0" cy="0" rx="2.2" ry="3.1" />
        <path className="bg-stem" d="M-2 2.6 C-0.8 3.6 0.8 3.6 2 2.6" />
      </g>
    </>
  );
}

function SummerLeaves() {
  return (
    <>
      <path className="bg-stem" d="M2 12.2 C8 12.2 12.5 11.6 17 10.4" />
      <path
        className="bg-leaf"
        d="M4.4 12 C7.4 8.4 11.6 8 14.2 11 C11.6 14 7.4 14.4 4.4 12 Z"
      />
      <path className="bg-rib" d="M5 12 C8.6 11.8 11.6 11.6 13.8 11.2" />
      <path
        className="bg-leaf"
        opacity="0.85"
        d="M6.4 12.6 C8.6 15 11.8 15.4 14 13.6 C12.2 11.6 9 11.4 6.4 12.6 Z"
      />
      <g transform="translate(19.6 9.6)">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <ellipse
            key={index}
            className="bg-petal"
            cx="0"
            cy="-2.4"
            rx="1.6"
            ry="2.5"
            transform={`rotate(${index * 60})`}
          />
        ))}
        <circle className="bg-core" r="1.2" />
      </g>
    </>
  );
}

function SummerBerries() {
  return (
    <>
      <path className="bg-stem" d="M2 12.6 C8 12.6 12.5 12 16.5 11" />
      <path
        className="bg-leaf"
        d="M4 12.3 C7.6 8.2 14.5 7.8 18 11.2 C14.5 14.8 7.6 15 4 12.3 Z"
      />
      <path className="bg-rib" d="M5 12.3 C10 12.1 14 11.9 17.5 11.4" />
      <circle className="bg-berry" cx="20.6" cy="8.4" r="1.5" />
      <circle className="bg-berry" cx="22.4" cy="10.6" r="1.3" />
    </>
  );
}

function AutumnLeaf() {
  return (
    <>
      <path className="bg-stem" d="M2 11.8 C7 11.8 11 12.4 14.4 13.4" />
      <path
        className="bg-leaf"
        d="M4.2 12.2 C7.8 8.4 14 8 17.6 11.4 C14 15 7.8 15.2 4.2 12.2 Z"
      />
      <path className="bg-rib" d="M5.2 12.2 C9.4 12.1 13.4 11.9 17 11.6" />
      <g transform="translate(20.8 17) rotate(18)">
        <path
          className="bg-leaf"
          d="M0 0 C2.2 -2.8 6 -3.2 8.2 -0.8 C6 2 2.2 2.2 0 0 Z"
        />
      </g>
    </>
  );
}

function AutumnPod() {
  return (
    <>
      <path className="bg-stem" d="M2 12.2 C7 12.2 10.6 11.4 13.6 10.2" />
      <path
        className="bg-leaf"
        d="M4.6 12 C7.2 9.6 10.8 9.4 12.8 11.2 C10.8 13.4 7.2 13.6 4.6 12 Z"
      />
      <g transform="translate(16.6 8.8) rotate(-14)">
        <ellipse className="bg-pod" cx="0" cy="0" rx="2.4" ry="3.8" />
        <path className="bg-stem" d="M0 3.6 L0 6.4" />
        <circle className="bg-berry" cx="0" cy="7.2" r="1.2" />
      </g>
    </>
  );
}

function WinterBerries() {
  return (
    <>
      <path className="bg-stem" d="M2 12.6 C7 12.6 12.4 12.5 19.4 12.2" />
      <path className="bg-stem" d="M8.6 12.6 C10.2 10.4 11.8 9 13.8 8.2" />
      <path className="bg-stem" d="M13.2 12.5 C14.8 13.8 16.2 14.6 18 15" />
      <circle className="bg-berry" cx="14.4" cy="7.8" r="1.9" />
      <circle className="bg-berry" cx="18.8" cy="15.2" r="1.7" />
      <circle className="bg-berry" cx="20.8" cy="12.2" r="1.5" />
      <g className="bg-frost" transform="translate(5 6.6)">
        <line x1="-2.4" y1="0" x2="2.4" y2="0" />
        <line x1="0" y1="-2.4" x2="0" y2="2.4" />
      </g>
    </>
  );
}

function WinterDormant() {
  return (
    <>
      <path className="bg-stem" d="M2 12.8 C6.4 12.8 9 11.6 12.4 10.8" />
      <path className="bg-stem" d="M12.4 10.8 C14.2 10.4 16 10 17.8 9.6" />
      <g transform="translate(19.2 9) rotate(16)">
        <ellipse className="bg-bud" cx="0" cy="0" rx="2.1" ry="3" />
        <path className="bg-frost" d="M-2 -0.4 C-1 -2.2 1 -2.2 2 -0.4" />
      </g>
      <circle className="bg-berry" cx="6.8" cy="12.8" r="1.4" />
    </>
  );
}

const SHAPES: Record<Season, Array<() => ReactElement>> = {
  spring: [SpringBlossom, SpringBud],
  summer: [SummerLeaves, SummerBerries],
  autumn: [AutumnLeaf, AutumnPod],
  winter: [WinterBerries, WinterDormant],
};

interface BotanicalGlyphProps {
  season: Season;
  seed: number;
  size?: number;
  facing?: "right" | "up";
}

export function BotanicalGlyph({
  season,
  seed,
  size = 24,
  facing = "right",
}: BotanicalGlyphProps) {
  const variants = SHAPES[season];
  const Shape = variants[Math.abs(Math.round(seed)) % variants.length];
  const tilt = (hash(seed * 3.7 + 5.1) - 0.5) * 11;
  const grow = 0.92 + hash(seed * 5.3 + 9.2) * 0.18;

  return (
    <GlyphSvg
      $season={season}
      viewBox="0 0 26 24"
      width={size}
      height={Math.round((size * 24) / 26)}
      aria-hidden="true"
      focusable="false"
    >
      <g transform={facing === "up" ? "rotate(-90 13 12)" : undefined}>
        <g
          transform={`translate(13 12) rotate(${tilt.toFixed(2)}) scale(${grow.toFixed(3)}) translate(-13 -12)`}
        >
          <Shape />
        </g>
      </g>
    </GlyphSvg>
  );
}

const GlyphSvg = styled.svg<{ $season: Season }>`
  display: block;
  overflow: visible;
  transform: rotate(var(--glyph-rotate, 0deg));
  transition: transform var(--dur-micro) var(--ease-out);

  & .bg-stem {
    fill: none;
    stroke: var(--vine);
    stroke-width: 1.15;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  & .bg-leaf {
    fill: var(--vine);
    fill-opacity: 0.75;
    stroke: color-mix(in srgb, var(--vine) 55%, var(--surface));
    stroke-width: 0.55;
  }

  & .bg-rib {
    fill: none;
    stroke: color-mix(in srgb, var(--vine) 45%, var(--surface));
    stroke-width: 0.7;
    stroke-linecap: round;
  }

  & .bg-petal {
    fill: var(--vine-bloom);
    fill-opacity: 0.92;
    stroke: color-mix(in srgb, var(--vine-bloom) 62%, var(--ink));
    stroke-width: 0.4;
  }

  & .bg-core {
    fill: var(--accent-ink);
    fill-opacity: 0.72;
  }

  & .bg-pod,
  & .bg-berry,
  & .bg-bud {
    fill: var(--vine-bloom);
    stroke: color-mix(in srgb, var(--vine-bloom) 60%, var(--ink));
    stroke-width: 0.4;
  }

  & .bg-pod {
    fill-opacity: 0.9;
  }

  & .bg-bud {
    fill-opacity: 0.8;
  }

  & .bg-frost {
    fill: none;
    stroke: var(--vine-bloom);
    stroke-width: 1.1;
    stroke-linecap: round;
  }

  ${({ $season }) =>
    $season === "spring" &&
    css`
      & .bg-leaf {
        fill-opacity: 0.5;
      }
    `}

  ${({ $season }) =>
    $season === "autumn" &&
    css`
      & .bg-leaf {
        fill: var(--vine-bloom);
        fill-opacity: 0.85;
        stroke: color-mix(in srgb, var(--vine-bloom) 60%, var(--ink));
      }

      & .bg-rib {
        stroke: color-mix(in srgb, var(--vine-bloom) 60%, var(--ink));
      }
    `}
`;
