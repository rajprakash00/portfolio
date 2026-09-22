interface StemOptions {
  height: number;
  centerX: number;
  amplitude: number;
  growthPoints: number[];
}

function catmullRom(points: Array<{ x: number; y: number }>) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/** Organic stem: gentle sway between waypoints, blooming exactly at each growth point. */
export function buildStem({ height, centerX, amplitude, growthPoints }: StemOptions) {
  const sway = [-1, 0.65, -0.55, 0.9, -0.35, 0.7, -0.85, 0.5];

  const waypoints: Array<{ x: number; y: number }> = [];
  const visiblePoints = growthPoints.filter((y) => y > 40 && y < height - 40);

  const yPositions: number[] = [];
  const step = 90;
  for (let y = 30; y < height - 10; y += step) yPositions.push(y);
  visiblePoints.forEach((y) => {
    if (!yPositions.some((existing) => Math.abs(existing - y) < 34)) {
      yPositions.push(y);
    }
  });
  yPositions.sort((a, b) => a - b);

  yPositions.forEach((y, index) => {
    const isGrowthPoint = visiblePoints.some((point) => Math.abs(point - y) < 1);
    const x = isGrowthPoint
      ? centerX
      : centerX + amplitude * sway[index % sway.length];
    waypoints.push({ x, y });
  });

  const full = [
    { x: centerX, y: -24 },
    ...waypoints,
    { x: centerX, y: height + 24 },
  ];
  return catmullRom(full);
}

export const LEAF_BLADE =
  "M0 0 C7 -10, 24 -13, 35 0 C24 13, 7 10, 0 0 Z";
