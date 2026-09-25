import { motion } from "framer-motion";
import styled, { css } from "styled-components";

import { bloomInk } from "@/components/journey/vine/vocabulary";
import type { SpecimenState } from "@/data/projects";
import type { Season } from "@/lib/season";

/** One ink per specimen state: growing reads as vine, in bloom as accent, pressed as record. */
const stateInk = ($state: SpecimenState) => css`
  color: ${$state === "growing"
    ? "color-mix(in srgb, var(--vine) 62%, var(--ink))"
    : $state === "in bloom"
      ? "var(--accent-ink)"
      : "var(--muted)"};
`;

/* --------------------------------- specimen -------------------------------- */

export const Sheets = styled.div`
  display: grid;
  margin-top: 0.4rem;
`;

export const Sheet = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  padding-top: 2.6rem;
  scroll-margin-top: 84px;

  & + & {
    margin-top: 2.8rem;
    border-top: 1px solid var(--divider);
  }

  @media (min-width: 1000px) {
    grid-template-columns: max(
        0px,
        calc((100% - var(--max-width)) / 2)
      ) minmax(0, 1fr);
    padding-top: 3.2rem;

    & + & {
      margin-top: 3.6rem;
    }
  }
`;

/**
 * Mobile: the specimen sits small in the second column beside the heading, so
 * the project reads first without an illustration block of its own. Desktop:
 * the head dissolves and the specimen rejoins the overhang rail.
 */
export const SheetHead = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 1.5rem;
  align-items: start;

  @media (min-width: 1000px) {
    display: contents;
  }
`;

export const SpecimenCell = styled.div`
  grid-column: 2;
  grid-row: 1;

  @media (max-width: 999px) {
    svg {
      width: 76px;
    }
  }

  @media (min-width: 1000px) {
    grid-column: 1;
    grid-row: 1 / span 2;
    justify-self: end;
    padding-right: 1.9rem;
  }
`;

export const SheetText = styled(motion.div)`
  grid-column: 1;
  grid-row: 1;
  min-width: 0;

  @media (min-width: 1000px) {
    grid-column: 2;
    grid-row: 1;
    max-width: var(--max-width);
  }
`;

export const SheetRest = styled(motion.div)`
  max-width: var(--max-width);

  @media (min-width: 1000px) {
    grid-column: 2;
    grid-row: 2;
  }
`;

export const SheetName = styled.h2`
  margin: 0;
  padding-top: 0;
  font-size: clamp(1.45rem, 2.6vw, 1.75rem);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: var(--ink);
`;

export const SheetMeta = styled.p`
  margin: 0.55rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  color: var(--muted);
`;

export const SheetState = styled.span<{ $state: SpecimenState }>`
  ${({ $state }) => stateInk($state)}
`;

export const SheetSummary = styled.p`
  margin: 0.9rem 0 0;
  max-width: 58ch;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--ink);
`;

export const Habitat = styled.p`
  margin: 1.2rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  line-height: 1.7;
  letter-spacing: 0.02em;
  color: color-mix(in srgb, var(--ink) 74%, var(--muted));
`;

export const HabitatLabel = styled.span`
  margin-right: 0.6rem;
  letter-spacing: 0.08em;
  color: var(--accent-ink);
`;

export const MeasurementList = styled.dl`
  display: grid;
  margin: 1.4rem 0 0;
  max-width: 26rem;
`;

export const MeasurementRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.42rem 0;

  & + & {
    border-top: 1px solid var(--divider);
  }
`;

export const MeasurementLabel = styled.dt`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--muted);
`;

export const MeasurementValue = styled.dd`
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.98rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  text-align: right;
  color: var(--ink);
`;

export const Provenance = styled.p`
  margin: 0.55rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  line-height: 1.6;
  letter-spacing: 0.02em;
  color: var(--muted);
`;

export const SheetNotes = styled.div`
  display: grid;
  gap: 1.15rem;
  margin-top: 1.6rem;
  max-width: 58ch;
`;

export const Note = styled.div`
  display: grid;
  gap: 0.25rem;
`;

export const NoteLabel = styled.p`
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--accent-ink);
`;

export const NoteBody = styled.p`
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.62;
  color: color-mix(in srgb, var(--ink) 88%, var(--muted));
`;

export const SheetLinks = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.4rem;
  margin: 1.5rem 0 0;
`;

export const SheetLink = styled.a`
  /* Padding cancels out with the margin, so the tap target grows in place. */
  padding-block: 0.6rem;
  margin-block: -0.6rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: color-mix(in srgb, var(--accent) 45%, transparent);
  color: var(--accent-ink);

  &:hover {
    text-decoration-color: currentColor;
  }
`;

/* --------------------------------- specimen -------------------------------- */

export const SpecimenSvg = styled.svg<{
  $season: Season;
  $seedling: boolean;
}>`
  display: block;
  width: ${({ $seedling }) => ($seedling ? "104px" : "132px")};
  height: auto;
  overflow: visible;

  @media (min-width: 1000px) {
    width: ${({ $seedling }) => ($seedling ? "124px" : "168px")};
  }

  .specimen-mount {
    stroke: color-mix(in srgb, var(--vine) 36%, transparent);
    stroke-width: 1;
  }

  .specimen-glow {
    fill: none;
    stroke: var(--vine);
    stroke-width: 13;
    stroke-opacity: 0.14;
    stroke-linecap: round;
  }

  .specimen-stem {
    fill: none;
    stroke: var(--vine);
    stroke-width: 1.7;
    stroke-opacity: 0.92;
    stroke-linecap: round;
  }

  .specimen-leaf {
    fill: var(--vine);
    fill-opacity: 0.8;
    stroke: color-mix(in srgb, var(--vine) 55%, var(--surface));
    stroke-width: 0.55;
    transform-box: fill-box;
    transform-origin: 0% 50%;
    opacity: 0;
  }

  &.is-in .specimen-leaf {
    animation: specimenLeaf 600ms var(--ease-out) both;
    animation-delay: var(--leaf-delay, 0ms);
  }

  .specimen-bud ellipse {
    fill: var(--vine-bloom);
    fill-opacity: 0.9;
    stroke: color-mix(in srgb, var(--vine-bloom) 60%, var(--ink));
    stroke-width: 0.4;
  }

  .specimen-bud path {
    fill: none;
    stroke: var(--vine);
    stroke-width: 1;
    stroke-linecap: round;
  }

  .specimen-bud-inner {
    transform-box: fill-box;
    transform-origin: center;
    opacity: 0;
  }

  &.is-in .specimen-bud-inner {
    animation: specimenBud 560ms var(--ease-out) both;
    animation-delay: 520ms;
  }

  .specimen-bloom .bloom-inner {
    opacity: 0;
  }

  &.is-in .specimen-bloom .bloom-inner {
    animation: specimenBloom 620ms var(--ease-out) both;
    animation-delay: 640ms;
  }

  ${bloomInk}

  ${({ $season }) =>
    $season === "spring" &&
    css`
      .specimen-leaf {
        fill-opacity: 0.5;
      }
    `}

  ${({ $season }) =>
    $season === "autumn" &&
    css`
      .specimen-leaf {
        fill: var(--vine-bloom);
        fill-opacity: 0.82;
        stroke: color-mix(in srgb, var(--vine-bloom) 60%, var(--ink));
      }
    `}

  @keyframes specimenLeaf {
    from {
      transform: scale(0.16) rotate(-8deg);
      opacity: 0;
    }
    to {
      transform: scale(var(--leaf-scale, 1)) rotate(0deg);
      opacity: 1;
    }
  }

  @keyframes specimenBud {
    from {
      transform: scale(0.3);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes specimenBloom {
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
    .specimen-leaf {
      opacity: 1;
      transform: scale(var(--leaf-scale, 1));
      animation: none !important;
    }

    .specimen-bud-inner,
    .specimen-bloom .bloom-inner {
      opacity: 1;
      animation: none !important;
      transform: none;
    }
  }
`;
