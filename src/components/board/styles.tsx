import { motion } from "framer-motion";
import styled from "styled-components";

interface NotePlacement {
  $span: number;
  $start?: number;
  $tilt: number;
}

const placementColumn = ({ $span, $start }: NotePlacement) =>
  $start ? `${$start} / span ${$span}` : `span ${$span}`;

export const BoardSection = styled.section`
  /* Wide section, centred like the rest of the site; header, bar and meta
     share the canvas's left edge. */
  && {
    grid-column: 1 / -1;
    justify-self: center;
  }
  width: min(var(--max-width-wide), calc(100% - 2rem));
  padding: 2.5rem 0 2rem;
`;

export const BoardHeader = styled.header`
  max-width: var(--max-width);
  margin-bottom: 2rem;
`;

export const BoardKicker = styled.p`
  margin: 0 0 0.65rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--accent-ink);
`;

export const BoardTitle = styled.h2`
  margin: 0;
  padding-top: 0;
  /* font-size: clamp(2.4rem, 5vw, 3.4rem); */
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--ink);
`;

export const BoardLede = styled.p`
  margin: 0.9rem 0 0;
  max-width: 52ch;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--muted);
`;

export const ArchiveBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

export const ArchiveGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
`;

export const ArchiveOption = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: baseline;
  gap: 0.45rem;
  padding: 0.35rem 0.8rem;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--accent)" : "var(--divider)")};
  border-radius: 999px;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
  color: ${({ $active }) => ($active ? "var(--accent-ink)" : "var(--muted)")};
  background-color: ${({ $active }) =>
    $active ? "var(--accent-soft)" : "transparent"};
  transition: color var(--dur-micro) var(--ease-out),
    background-color var(--dur-micro) var(--ease-out),
    border-color var(--dur-micro) var(--ease-out),
    transform var(--dur-micro) var(--ease-out);

  &:hover {
    color: var(--accent-ink);
    border-color: var(--accent);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:active {
      transform: none;
    }
  }
`;

export const ArchiveCount = styled.span`
  font-size: 0.64rem;
  opacity: 0.65;
`;

export const YearStepper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  margin-left: 0.3rem;
`;

export const YearLabel = styled.span`
  min-width: 3.4em;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
  color: var(--muted);
`;

export const ArchiveLink = styled.div`
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.06em;

  a {
    color: var(--muted);
    text-decoration: none;
    transition: color var(--dur-micro) var(--ease-out);
  }

  a:hover {
    color: var(--accent-ink);
  }

  @media (max-width: 764px) {
    margin-left: 0;
  }
`;

export const FlipControls = styled.div`
  display: inline-flex;
  gap: 0.35rem;

  @media (max-width: 764px) {
    margin-left: 0;
  }
`;

export const FlipButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid var(--divider);
  border-radius: 999px;
  background-color: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 1rem;
  line-height: 0;
  transition: color var(--dur-micro) var(--ease-out),
    border-color var(--dur-micro) var(--ease-out),
    transform var(--dur-micro) var(--ease-out);

  &:hover:not(:disabled) {
    color: var(--accent-ink);
    border-color: var(--accent);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:active:not(:disabled) {
      transform: none;
    }
  }
`;

export const FlipStage = styled.div`
  perspective: 1500px;
  min-height: 430px;
  display: grid;
  align-content: start;

  @media (max-width: 764px) {
    perspective: 900px;
    min-height: 0;
  }
`;

export const Canvas = styled.div`
  padding: clamp(1.1rem, 2.5vw, 2rem);
  border: 1px solid var(--divider);
  border-radius: var(--radius-card);
  background-color: color-mix(in srgb, var(--surface) 84%, var(--accent-soft));
  box-shadow: 0 24px 60px -48px rgba(31, 26, 22, 0.55);
`;

export const EmptyCanvas = styled.p`
  margin: 0;
  padding: 1.8rem 0.5rem;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--muted);
`;

export const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: clamp(1rem, 2.5vw, 1.75rem);

  @media (max-width: 764px) {
    grid-template-columns: 1fr;
  }
`;

export const Note = styled(motion.article)<NotePlacement>`
  grid-column: ${placementColumn};
  position: relative;
  padding: 1.4rem 1.35rem 1.3rem;
  border-radius: var(--radius-note);
  rotate: ${({ $tilt }) => $tilt}deg;
  background-color: color-mix(in srgb, var(--surface) 42%, var(--accent-soft));
  box-shadow: 0 1px 0 rgba(31, 26, 22, 0.05),
    0 18px 32px -26px rgba(31, 26, 22, 0.55);
  transition-property: rotate, translate;
  transition-duration: var(--dur-micro);
  transition-timing-function: var(--ease-out);

  /* Tape strip, the one physical tell that this is a sticky note. */
  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: 50%;
    width: 44px;
    height: 13px;
    transform: translateX(-50%) rotate(-2deg);
    border-radius: 2px;
    background-color: color-mix(in srgb, var(--accent) 20%, transparent);
  }

  /* Deeper hover shadow lives on a pseudo-element so only opacity animates. */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: 0 26px 42px -26px rgba(31, 26, 22, 0.6);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--dur-micro) var(--ease-out);
  }

  &:hover {
    rotate: 0deg;
    translate: 0 -3px;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 764px) {
    grid-column: 1 / -1;
    rotate: 0deg;

    &:hover {
      translate: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      translate: none;
      rotate: ${({ $tilt }) => $tilt}deg;
    }
  }
`;

export const NoteKicker = styled.p`
  margin: 0 0 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
  color: var(--accent-ink);
`;

export const NoteBody = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--ink);
`;

export const SkeletonNote = styled.div<NotePlacement>`
  grid-column: ${placementColumn};
  min-height: ${({ $span }) => ($span >= 4 ? "150px" : "120px")};
  border-radius: var(--radius-note);
  background-color: color-mix(in srgb, var(--surface) 55%, var(--accent-soft));
  opacity: 0.7;

  @media (max-width: 764px) {
    grid-column: 1 / -1;
  }
`;

export const BoardMeta = styled.p`
  margin: 1.1rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: var(--muted);

  a {
    color: var(--accent-ink);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
