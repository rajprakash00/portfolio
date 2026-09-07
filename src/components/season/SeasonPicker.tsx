import styled from "styled-components";
import {
  GiLotusFlower,
  GiMapleLeaf,
  GiSnowflake1,
  GiSunflower,
} from "react-icons/gi";

import { SEASONS } from "@/lib/season";
import type { Season } from "@/lib/season";
import { useSeason } from "./SeasonContext";

const SEASON_META: Record<
  Season,
  { label: string; Icon: typeof GiLotusFlower }
> = {
  spring: { label: "Spring", Icon: GiLotusFlower },
  summer: { label: "Summer", Icon: GiSunflower },
  autumn: { label: "Autumn", Icon: GiMapleLeaf },
  winter: { label: "Winter", Icon: GiSnowflake1 },
};

const PickerGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--divider);
  border-radius: 999px;
  background-color: var(--accent-soft);
`;

const PickerOption = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 16px;
  line-height: 0;
  color: ${({ $active }) => ($active ? "var(--accent-ink)" : "var(--muted)")};
  background-color: ${({ $active }) =>
    $active ? "var(--surface)" : "transparent"};
  box-shadow: ${({ $active }) =>
    $active ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "none"};
  transition: background-color var(--dur-micro) var(--ease-out),
    color var(--dur-micro) var(--ease-out),
    transform var(--dur-micro) var(--ease-out);

  &:hover {
    color: var(--accent-ink);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
    &:active {
      transform: none;
    }
  }
`;

export function SeasonPicker() {
  const { season, setSeason } = useSeason();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const current = season ? SEASONS.indexOf(season) : -1;
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const next = SEASONS[(current + delta + SEASONS.length) % SEASONS.length];
    const rect = document
      .getElementById(`season-option-${next}`)
      ?.getBoundingClientRect();
    setSeason(
      next,
      rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : undefined
    );
    document.getElementById(`season-option-${next}`)?.focus();
  };

  return (
    <PickerGroup
      role="radiogroup"
      aria-label="Season"
      onKeyDown={onKeyDown}
    >
      {SEASONS.map((s) => {
        const { label, Icon } = SEASON_META[s];
        const active = season === s;
        return (
          <PickerOption
            key={s}
            id={`season-option-${s}`}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`Switch to ${label}`}
            title={label}
            $active={active}
            tabIndex={season === null || active ? 0 : -1}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setSeason(s, {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
              });
            }}
          >
            <Icon aria-hidden="true" />
          </PickerOption>
        );
      })}
    </PickerGroup>
  );
}
