import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import styled, { css } from "styled-components";

import type { Season } from "@/lib/season";
import { hash } from "@/lib/hash";

import { buildStem, LEAF_BLADE } from "./stem";

interface Sprout {
  x: number;
  y: number;
  angle: number;
  scale: number;
  fraction: number;
  pairedBlade: boolean;
}

interface Bloom {
  x: number;
  y: number;
  fraction: number;
}

interface VineCanvasProps {
  width: number;
  height: number;
  centerX: number;
  amplitude?: number;
  leafScale?: number;
  growthPoints: number[];
  progress: MotionValue<number>;
  season: Season;
}

function BloomShape({ season }: { season: Season }) {
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

function Twig() {
  return (
    <g className="twig">
      <line x1="0" y1="0" x2="20" y2="0" />
      <circle cx="20" cy="0" r="2.2" />
    </g>
  );
}

export function VineCanvas({
  width,
  height,
  centerX,
  amplitude = 14,
  leafScale = 1,
  growthPoints,
  progress,
  season,
}: VineCanvasProps) {
  const reduceMotion = useReducedMotion();
  const reduce = Boolean(reduceMotion);
  const pathRef = useRef<SVGPathElement>(null);
  const [sprouts, setSprouts] = useState<Sprout[]>([]);
  const [grown, setGrown] = useState(0);

  const stemPath = useMemo(
    () => buildStem({ height, centerX, amplitude, growthPoints }),
    [height, centerX, amplitude, growthPoints]
  );
  const drawn = useSpring(progress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(drawn, "change", (value) => {
    if (reduce) return;
    const quantized = Math.round(value * 240) / 240;
    setGrown((prev) => (Math.abs(prev - quantized) > 0.005 ? quantized : prev));
  });

  useEffect(() => {
    if (reduce) {
      setGrown(1);
      return;
    }
    setGrown(drawn.get());
  }, [reduce, drawn]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || height <= 0 || width <= 0) return;
    const total = path.getTotalLength();
    if (!total) return;
    const count = Math.min(26, Math.max(10, Math.round(height / 95)));
    const next: Sprout[] = [];
    for (let i = 0; i < count; i += 1) {
      const base = (i + 0.5) / count;
      const jitter = (hash(i * 13.37) - 0.5) * 0.03;
      const fraction = Math.min(0.985, Math.max(0.02, base + jitter));
      if (growthPoints.some((y) => Math.abs(y / height - fraction) < 0.035)) continue;
      const point = path.getPointAtLength(total * fraction);
      const side = i % 2 === 0 ? -1 : 1;
      next.push({
        x: point.x,
        y: point.y,
        angle: side * (32 + hash(i + 3.1) * 32),
        scale: (0.55 + hash(i + 7.7) * 0.5) * leafScale,
        fraction,
        pairedBlade: i % 5 === 1,
      });
    }
    setSprouts(next);
  }, [stemPath, height, width, growthPoints, leafScale]);

  const blooms = useMemo(
    () =>
      growthPoints
        .filter((y) => y > 40 && y < height - 40)
        .map((y) => ({ x: centerX, y, fraction: y / height })),
    [growthPoints, centerX, height]
  );

  if (width <= 0 || height <= 0) return null;

  return (
    <VineSvg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      $season={season}
      $reduce={reduce}
      aria-hidden="true"
    >
      <path ref={pathRef} d={stemPath} className="measure" />
      <motion.path
        className="stem-glow"
        d={stemPath}
        style={reduce ? undefined : { pathLength: drawn }}
      />
      <motion.path
        className="stem-core"
        d={stemPath}
        style={reduce ? undefined : { pathLength: drawn }}
      />
      {sprouts.map((sprout, index) => (
        <g
          key={`${season}-sprout-${index}`}
          className={`sprout${grown >= sprout.fraction ? " is-in" : ""}`}
          transform={`translate(${sprout.x} ${sprout.y}) rotate(${sprout.angle})`}
        >
          {season === "winter" ? (
            <Twig />
          ) : (
            <>
              <path
                className="blade"
                d={LEAF_BLADE}
                style={
                  {
                    "--leaf-scale": sprout.scale,
                  } as CSSProperties
                }
              />
              {sprout.pairedBlade ? (
                <path
                  className="blade blade-pair"
                  d={LEAF_BLADE}
                  style={
                    {
                      "--leaf-scale": sprout.scale * 0.72,
                    } as CSSProperties
                  }
                />
              ) : null}
            </>
          )}
        </g>
      ))}
      {blooms.map((bloom, index) => (
        <g
          key={`${season}-bloom-${index}`}
          className={`bloom${grown >= bloom.fraction ? " is-in" : ""}`}
          transform={`translate(${bloom.x} ${bloom.y})`}
        >
          <BloomShape season={season} />
        </g>
      ))}
    </VineSvg>
  );
}

const VineSvg = styled.svg<{ $season: Season; $reduce: boolean }>`
  display: block;
  overflow: visible;

  .measure {
    fill: none;
    stroke: none;
  }

  .stem-glow {
    fill: none;
    stroke: var(--vine);
    stroke-width: 15;
    stroke-opacity: 0.15;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .stem-core {
    fill: none;
    stroke: var(--vine);
    stroke-width: 1.75;
    stroke-opacity: 0.9;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .sprout,
  .bloom {
    opacity: 0;
  }

  .sprout.is-in,
  .bloom.is-in {
    opacity: 1;
  }

  .blade {
    fill: var(--vine);
    fill-opacity: 0.78;
    stroke: color-mix(in srgb, var(--vine) 55%, var(--surface));
    stroke-width: 0.55;
    transform-box: fill-box;
    transform-origin: 0% 50%;
  }

  .sprout.is-in .blade {
    animation: bladeIn 640ms var(--ease-out) both;
  }

  .sprout.is-in .blade-pair {
    animation: bladePairIn 640ms var(--ease-out) both;
    animation-delay: 90ms;
  }

  .twig {
    stroke: var(--vine);
    transform-box: fill-box;
    transform-origin: 0% 50%;
  }

  .twig line {
    stroke-width: 1.1;
    stroke-linecap: round;
  }

  .twig circle {
    fill: var(--vine-bloom);
    stroke: none;
  }

  .sprout.is-in .twig {
    animation: sproutIn 520ms var(--ease-out) both;
  }

  .bloom-inner {
    transform-box: fill-box;
    transform-origin: center;
  }

  .bloom.is-in .bloom-inner {
    animation: bloomIn 620ms var(--ease-out) both;
    animation-delay: 140ms;
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

  ${({ $season }) =>
    $season === "spring" &&
    css`
      .blade {
        fill-opacity: 0.5;
      }
    `}

  ${({ $season }) =>
    $season === "autumn" &&
    css`
      .blade {
        fill: var(--vine-bloom);
        fill-opacity: 0.82;
        stroke: color-mix(in srgb, var(--vine-bloom) 60%, var(--ink));
      }
    `}

  @keyframes bladeIn {
    from {
      transform: scale(0.18) rotate(-9deg);
      opacity: 0;
    }
    to {
      transform: scale(var(--leaf-scale, 1)) rotate(0deg);
      opacity: 1;
    }
  }

  @keyframes bladePairIn {
    from {
      transform: scale(0.15) rotate(4deg);
      opacity: 0;
    }
    to {
      transform: scale(var(--leaf-scale, 0.72)) rotate(22deg);
      opacity: 1;
    }
  }

  @keyframes sproutIn {
    from {
      transform: scale(0.2);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes bloomIn {
    from {
      transform: scale(0.3);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sprout,
    .bloom {
      opacity: 1;
    }

    .blade,
    .blade-pair,
    .twig,
    .bloom-inner {
      animation: none !important;
    }
  }
`;
