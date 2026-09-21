import styled from "styled-components";

const LEVEL_BACKGROUND: Record<number, string> = {
  [-1]: "transparent",
  0: "var(--divider)",
  1: "color-mix(in srgb, var(--accent) 25%, transparent)",
  2: "color-mix(in srgb, var(--accent) 45%, transparent)",
  3: "color-mix(in srgb, var(--accent) 70%, transparent)",
  4: "var(--accent)",
};

export const Figure = styled.figure`
  margin: 1.5rem 0 2.25rem;
`;

export const Grid = styled.div<{ $weeks: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $weeks }) => $weeks}, minmax(0, 1fr));
  grid-template-rows: repeat(7, auto);
  grid-auto-flow: column;
  gap: 2px;
  width: 100%;

  @media (max-width: 480px) {
    gap: 1px;
  }
`;

export const Cell = styled.div<{ $level: number; $skeleton?: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 2px;
  background-color: ${({ $skeleton, $level }) =>
    $skeleton ? "var(--divider)" : LEVEL_BACKGROUND[$level]};
  opacity: ${({ $skeleton }) => ($skeleton ? 0.55 : 1)};
`;

export const FigCaption = styled.figcaption`
  margin-top: 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
  color: var(--muted);

  a {
    color: var(--accent-ink);
  }
`;

export const Fallback = styled.p`
  margin: 1.5rem 0 2.25rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--muted);

  a {
    color: var(--accent-ink);
  }
`;
