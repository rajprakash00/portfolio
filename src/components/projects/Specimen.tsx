import type { CSSProperties } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { LEAF_BLADE } from "@/components/journey/vine/stem";
import { BloomShape } from "@/components/journey/vine/vocabulary";
import type { SpecimenState } from "@/data/projects";
import { hash } from "@/lib/hash";
import { EASE_OUT } from "@/lib/motion";
import type { Season } from "@/lib/season";
import { useReducedMotionAfterMount } from "@/lib/useReducedMotionAfterMount";

import { SpecimenSvg } from "./styles";

const VIEW_WIDTH = 180;
const VIEW_HEIGHT = 340;
const BASE = { x: 90, y: 322 };

interface Point {
  x: number;
  y: number;
}

function pointOnCubic(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  t: number
): Point {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
    y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
  };
}

function tangentAngle(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  t: number
): number {
  const u = 1 - t;
  const dx =
    3 * u * u * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x);
  const dy =
    3 * u * u * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

interface SpecimenProps {
  slug: string;
  season: Season;
  state: SpecimenState;
  seedling?: boolean;
}

/**
 * A mounted upright specimen: one seeded stem, leaves along it, and a bud or
 * the season's bloom at the tip. Growing keeps fewer leaves and a bud; in bloom
 * unfurls the full set. Drawn once on viewport entry, static under reduced motion.
 */
export function Specimen({
  slug,
  season,
  state,
  seedling = false,
}: SpecimenProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotionAfterMount();
  const active = inView || reduce;

  const rand = (key: string) => hash(`${slug}:${key}`);
  const growing = state === "growing";
  const direction = rand("side") > 0.5 ? 1 : -1;
  const lean = (9 + rand("sway") * 15) * direction;
  const tipY = (growing ? 88 : 42) - rand("tip") * (growing ? 6 : 16);
  const p0 = BASE;
  const p1 = {
    x: 90 + lean * (0.7 + rand("p1") * 0.5),
    y: BASE.y - (100 + rand("p1y") * 40),
  };
  const p2 = {
    x: 90 - lean * (0.8 + rand("p2") * 0.6),
    y: tipY + (BASE.y - tipY) * (0.34 + rand("p2y") * 0.18),
  };
  const p3 = { x: 90 + lean * (0.15 + rand("p3") * 0.3), y: tipY };
  const stem = `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`;

  const leafCount = growing
    ? 3 + Math.round(rand("count") * 1.4)
    : 5 + Math.round(rand("count") * 3);
  const firstT = growing ? 0.22 : 0.16;
  const lastT = growing ? 0.74 : 0.86;
  const startSide = rand("start") > 0.5 ? -1 : 1;

  const leaves = Array.from({ length: leafCount }).map((_, index) => {
    const along =
      leafCount === 1
        ? 0.5
        : firstT + ((lastT - firstT) * index) / (leafCount - 1);
    const t = Math.min(
      0.94,
      Math.max(0.08, along + (rand(`t${index}`) - 0.5) * 0.04)
    );
    const anchor = pointOnCubic(p0, p1, p2, p3, t);
    const side = (index % 2 === 0 ? -1 : 1) * startSide;
    const angle =
      tangentAngle(p0, p1, p2, p3, t) + side * (40 + rand(`a${index}`) * 22);
    const scale = (growing ? 0.7 : 0.82) + rand(`s${index}`) * 0.38;
    return { anchor, angle, scale, index };
  });

  const draw = active ? 1 : 0;
  const drawTransition = reduce
    ? { duration: 0 }
    : { duration: 0.8, ease: EASE_OUT };

  return (
    <SpecimenSvg
      ref={ref}
      className={active ? "is-in" : undefined}
      $season={season}
      $seedling={seedling}
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      aria-hidden="true"
      focusable="false"
    >
      <line
        className="specimen-mount"
        x1={BASE.x - 40}
        y1={BASE.y + 10}
        x2={BASE.x + 40}
        y2={BASE.y + 10}
      />
      <motion.path
        className="specimen-glow"
        d={stem}
        initial={false}
        animate={{ pathLength: draw }}
        transition={drawTransition}
      />
      <motion.path
        className="specimen-stem"
        d={stem}
        initial={false}
        animate={{ pathLength: draw }}
        transition={drawTransition}
      />
      {leaves.map(({ anchor, angle, scale, index }) => (
        <g
          key={index}
          transform={`translate(${anchor.x.toFixed(2)} ${anchor.y.toFixed(
            2
          )}) rotate(${angle.toFixed(1)})`}
        >
          <path
            className="specimen-leaf"
            d={LEAF_BLADE}
            style={
              {
                "--leaf-scale": scale.toFixed(3),
                "--leaf-delay": `${340 + index * 55}ms`,
              } as CSSProperties
            }
          />
        </g>
      ))}
      {growing ? (
        <g
          className="specimen-bud"
          transform={`translate(${p3.x.toFixed(2)} ${(p3.y + 3).toFixed(
            2
          )}) rotate(${(tangentAngle(p0, p1, p2, p3, 1) * 0.35).toFixed(1)})`}
        >
          <g className="specimen-bud-inner">
            <g transform={`scale(${(1.1 + rand("bud") * 0.5).toFixed(2)})`}>
              <ellipse cx="0" cy="-4.6" rx="3.4" ry="5.6" />
              <path d="M-2.8 1.2 C-1.5 3.2 1.5 3.2 2.8 1.2" />
            </g>
          </g>
        </g>
      ) : (
        <g
          className="specimen-bloom"
          transform={`translate(${p3.x.toFixed(2)} ${p3.y.toFixed(2)})`}
        >
          <g transform={`scale(${(1.35 + rand("bloom") * 0.5).toFixed(2)})`}>
            <BloomShape season={season} />
          </g>
        </g>
      )}
    </SpecimenSvg>
  );
}
