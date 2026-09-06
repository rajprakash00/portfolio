import { useEffect, useRef } from "react";

import {
  SEASON_CHANGE_EVENT,
  Season,
  SeasonChangeEventDetail,
} from "@/lib/season";
import { SprinkleCanvas } from "./styles";

interface Particle {
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
}

const BURST_MS = 1200;
const COUNT = 80;
const MAX_DPR = 2;

// Seasonal gravity: most particles fall, fireflies drift upward
const GRAVITY: Record<Season, number> = {
  spring: 0.055,
  summer: -0.02,
  autumn: 0.07,
  winter: 0.045,
};

function getPalette(season: Season): string[] {
  const root = getComputedStyle(document.documentElement);
  const pick = (name: string) => root.getPropertyValue(name).trim();
  switch (season) {
    case "spring":
      return [pick("--accent"), pick("--accent-soft"), pick("--vine-bloom")];
    case "summer":
      return [pick("--accent"), pick("--vine-bloom"), pick("--accent-ink")];
    case "autumn":
      return [pick("--accent"), pick("--accent-ink"), pick("--vine-bloom")];
    case "winter":
      return [pick("--vine-bloom"), pick("--accent-soft"), pick("--accent")];
  }
}

function spawn(
  season: Season,
  origin: SeasonChangeEventDetail["origin"],
  now: number
): Particle[] {
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

const ParticleSprinkle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    let particles: Particle[] = [];
    let season: Season = "spring";

    const tick = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);
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
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (particles.length > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rafRef.current = null;
      }
    };

    const onSeasonChange = (e: Event) => {
      const detail = (e as CustomEvent<SeasonChangeEventDetail>).detail;
      if (!detail) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      season = detail.season;
      resize();
      particles = spawn(
        detail.season,
        detail.origin,
        performance.now()
      );
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener(SEASON_CHANGE_EVENT, onSeasonChange);
    return () => {
      window.removeEventListener(SEASON_CHANGE_EVENT, onSeasonChange);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <SprinkleCanvas ref={canvasRef} aria-hidden />;
};

export default ParticleSprinkle;
