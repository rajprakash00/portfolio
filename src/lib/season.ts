export const SEASONS = ["spring", "summer", "autumn", "winter"] as const;
export type Season = (typeof SEASONS)[number];

export const SEASON_STORAGE_KEY = "season";

/** Window CustomEvent dispatched on season switch; slice 3 board + slice 4 vine listen to this. */
export const SEASON_CHANGE_EVENT = "seasonchange";

export interface SeasonChangeEventDetail {
  season: Season;
  previous: Season | null;
  /** Viewport coords of the control that triggered the switch (sprinkle origin). */
  origin: { x: number; y: number };
}

export function isSeason(value: unknown): value is Season {
  return (
    typeof value === "string" && (SEASONS as readonly string[]).includes(value)
  );
}

/** Month is 0-indexed (Jan = 0). Mar–May spring, Jun–Aug summer, Sep–Nov autumn, Dec–Feb winter. */
export function getSeasonByMonth(month: number): Season {
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

export function getDefaultSeason(date = new Date()): Season {
  return getSeasonByMonth(date.getMonth());
}

export function getPersistedSeason(): Season | null {
  try {
    const raw = window.localStorage.getItem(SEASON_STORAGE_KEY);
    return isSeason(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function getInitialSeason(): Season {
  if (typeof window === "undefined") return getDefaultSeason();
  return getPersistedSeason() ?? getDefaultSeason();
}

export function applySeason(season: Season): void {
  const root = window.document.documentElement;
  root.style.setProperty("--initial-data-season", season);
  root.setAttribute("data-season", season);
  try {
    window.localStorage.setItem(SEASON_STORAGE_KEY, season);
  } catch {
    // private-mode storage can throw — theme is already applied above
  }
}
