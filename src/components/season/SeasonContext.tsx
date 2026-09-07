import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { PropsWithChildren } from "react";

import {
  SEASON_CHANGE_EVENT,
  SEASON_STORAGE_KEY,
  applySeason,
  getDefaultSeason,
  isSeason,
} from "@/lib/season";
import type { Season, SeasonChangeEventDetail } from "@/lib/season";

export type SeasonOrigin = SeasonChangeEventDetail["origin"];

type SeasonContextValue = {
  /** Null until hydrated from the pre-paint bootstrap (avoids SSR mismatch). */
  season: Season | null;
  setSeason: (season: Season, origin?: SeasonOrigin) => void;
};

const SeasonContext = createContext<SeasonContextValue | null>(null);

function readBootstrappedSeason(): Season {
  const attr = document.documentElement.getAttribute("data-season");
  if (isSeason(attr)) return attr;
  const cssVar = document.documentElement.style
    .getPropertyValue("--initial-data-season")
    .trim();
  if (isSeason(cssVar)) return cssVar;
  try {
    const stored = window.localStorage.getItem(SEASON_STORAGE_KEY);
    if (isSeason(stored)) {
      document.documentElement.setAttribute("data-season", stored);
      return stored;
    }
  } catch {
    // private-mode storage can throw; fall through to the month default
  }
  const fallback = getDefaultSeason();
  document.documentElement.setAttribute("data-season", fallback);
  return fallback;
}

export function SeasonProvider({ children }: PropsWithChildren<unknown>) {
  const [season, setSeasonState] = useState<Season | null>(null);

  // Hydrate from the blocking bootstrap in _document (no flash, no SSR mismatch).
  useEffect(() => {
    setSeasonState(readBootstrappedSeason());
  }, []);

  // Cross-tab sync: another tab picking a season applies here too.
  // No click origin here, so the sprinkle falls back to top-center.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== SEASON_STORAGE_KEY) return;
      const next = e.newValue;
      if (!isSeason(next)) return;
      setSeasonState((current) => {
        if (current === next) return current;
        document.documentElement.setAttribute("data-season", next);
        window.dispatchEvent(
          new CustomEvent<SeasonChangeEventDetail>(SEASON_CHANGE_EVENT, {
            detail: {
              season: next,
              previous: current,
              origin: { x: window.innerWidth / 2, y: 72 },
            },
          })
        );
        return next;
      });
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setSeason = useCallback((next: Season, origin?: SeasonOrigin) => {
    const at: SeasonOrigin = origin ?? { x: window.innerWidth / 2, y: 72 };
    setSeasonState((current) => {
      if (current === next) return current;
      applySeason(next);
      window.dispatchEvent(
        new CustomEvent<SeasonChangeEventDetail>(SEASON_CHANGE_EVENT, {
          detail: { season: next, previous: current, origin: at },
        })
      );
      return next;
    });
  }, []);

  return (
    <SeasonContext.Provider value={{ season, setSeason }}>
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason(): SeasonContextValue {
  const ctx = useContext(SeasonContext);
  if (!ctx) throw new Error("useSeason must be used within SeasonProvider");
  return ctx;
}
