import { useEffect, useRef } from "react";
import styled from "styled-components";

import { SEASON_CHANGE_EVENT } from "@/lib/season";
import type { Season, SeasonChangeEventDetail } from "@/lib/season";
import type { SeasonOrigin } from "./SeasonContext";

/*
 * z-index scale: navbar 2, side drawer (fixed, auto) 3-9,
 * sprinkle overlay 60, future grain overlay 70.
 */
const SprinkleLayer = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 60;
  pointer-events: none;
`;

const BURST_MS = 1200;
const COUNT = 80;
const MAX_DPR = 2;

// Seasonal gravity (px/frame² at 60fps): most particles fall, fireflies drift up.
const GRAVITY: Record<Season, number> = {
  spring: 0.055,
  summer: -0.02,
  autumn: 0.07,
  winter: 0.045,
};

// Hex fallbacks mirror the seasonal tokens (used only if a CSS var read comes back empty).
const FALLBACK: Record<string, string> = {
  "--accent": "#d6547e",
  "--accent-ink": "#a83a5e",
  "--accent-soft": "#f8e2e9",
  "--vine-bloom": "#e8a2b8",
};

const PALETTE_VARS: Record<Season, [string, string, string]> = {
  spring: ["--accent", "--accent-soft", "--vine-bloom"],
  summer: ["--accent", "--vine-bloom", "--accent-ink"],
  autumn: ["--accent", "--accent-ink", "--vine-bloom"],
  winter: ["--vine-bloom", "--accent-soft", "--accent"],
};

/** Palette from the live season tokens, so particles always match the active theme. */
function getPalette(season: Season): string[] {
  const root = getComputedStyle(document.documentElement);
  return PALETTE_VARS[season].map(
    (name) => root.getPropertyValue(name).trim() || FALLBACK[name]
  );
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  alphaScale: number;
  born: number;
  ttl: number;
};

function spawn(season: Season, origin: SeasonOrigin, now: number): Particle[] {
  const palette = getPalette(season);
  const particles: Particle[] = [];
  for (let i = 0; i < COUNT; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 5.5;
    particles.push({
      x: origin.x + (Math.random() - 0.5) * 16,
      y: origin.y + (Math.random() - 0.5) * 16,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.5,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.25,
      size: 3 + Math.random() * 5,
      color: palette[Math.floor(Math.random() * palette.length)],
      alphaScale: 0.55 + Math.random() * 0.45,
      born: now,
      ttl: BURST_MS * (0.55 + Math.random() * 0.45),
    });
  }
  return particles;
}

function drawParticle(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  season: Season,
  alpha: number
) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.globalAlpha = alpha * p.alphaScale;
  ctx.fillStyle = p.color;

  switch (season) {
    case "spring": // petal
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "summer": {
      // firefly: soft radial glow
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2.4);
      glow.addColorStop(0, p.color);
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 2.4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "autumn": // leaf
      ctx.beginPath();
      ctx.moveTo(-p.size, 0);
      ctx.quadraticCurveTo(0, -p.size * 0.85, p.size, 0);
      ctx.quadraticCurveTo(0, p.size * 0.85, -p.size, 0);
      ctx.fill();
      break;
    case "winter": // snow
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      break;
  }
  ctx.restore();
}

export function SprinkleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    window.addEventListener("resize", fit);

    let particles: Particle[] = [];
    let season: Season = "spring";

    const tick = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const g = GRAVITY[season];
      particles = particles.filter((p) => {
        const age = now - p.born;
        if (age > p.ttl) return false;
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + g;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        let alpha = 1 - age / p.ttl;
        if (season === "summer") {
          alpha *= 0.7 + 0.3 * Math.sin(now * 0.02 + p.born);
        }
        drawParticle(ctx, p, season, alpha);
        return true;
      });
      if (particles.length > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        rafRef.current = null;
      }
    };

    const onSeasonChange = (e: Event) => {
      const detail = (e as CustomEvent<SeasonChangeEventDetail>).detail;
      if (!detail) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      season = detail.season;
      fit();
      particles = spawn(detail.season, detail.origin, performance.now());
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener(SEASON_CHANGE_EVENT, onSeasonChange);
    return () => {
      window.removeEventListener(SEASON_CHANGE_EVENT, onSeasonChange);
      window.removeEventListener("resize", fit);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  return <SprinkleLayer ref={canvasRef} aria-hidden="true" />;
}
