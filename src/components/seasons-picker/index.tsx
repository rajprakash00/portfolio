import { LuFlower2, LuLeaf, LuSnowflake, LuSun } from "react-icons/lu";
import React, { useEffect, useState } from "react";

import {
  SEASONS,
  SEASON_CHANGE_EVENT,
  Season,
  SeasonChangeEventDetail,
  applySeason,
  getInitialSeason,
  isSeason,
} from "@/lib/season";
import { Picker, PickerButton } from "./styles";

const SEASON_GLYPHS: Record<Season, React.ComponentType> = {
  spring: LuFlower2,
  summer: LuSun,
  autumn: LuLeaf,
  winter: LuSnowflake,
};

const SEASON_LABELS: Record<Season, string> = {
  spring: "Spring",
  summer: "Summer",
  autumn: "Autumn",
  winter: "Winter",
};

const SeasonsPicker = () => {
  // null until mounted: avoids hydration mismatch with the _document bootstrap
  const [season, setSeason] = useState<Season | null>(null);

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-season");
    setSeason(isSeason(attr) ? attr : getInitialSeason());
  }, []);

  const handleSelect = (
    next: Season,
    origin: SeasonChangeEventDetail["origin"]
  ) => {
    if (next === season) return;
    setSeason(next);
    applySeason(next);
    const detail: SeasonChangeEventDetail = { season: next, origin };
    window.dispatchEvent(new CustomEvent(SEASON_CHANGE_EVENT, { detail }));
  };

  return (
    <Picker role="group" aria-label="Season theme">
      {SEASONS.map((s) => {
        const Glyph = SEASON_GLYPHS[s];
        const active = season === s;
        return (
          <PickerButton
            key={s}
            type="button"
            aria-pressed={active}
            aria-label={`${SEASON_LABELS[s]} theme`}
            title={`${SEASON_LABELS[s]} theme`}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              handleSelect(s, {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              });
            }}
          >
            <Glyph aria-hidden />
          </PickerButton>
        );
      })}
    </Picker>
  );
};

export default SeasonsPicker;
