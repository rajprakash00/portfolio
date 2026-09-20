import styled from "styled-components";

export const ArchiveSection = styled.section``;

export const ArchiveHeader = styled.header`
  margin-bottom: 2.25rem;
`;

export const ArchiveKicker = styled.p`
  margin: 0 0 0.65rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--accent-ink);
`;

export const ArchiveTitle = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.75rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: var(--ink);
`;

export const ArchiveLede = styled.p`
  margin: 0.8rem 0 0;
  max-width: 52ch;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--muted);
`;

export const BackLink = styled.p`
  margin: 1rem 0 0;
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
`;

export const YearJump = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;
  margin: 0 0 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;

  a {
    color: var(--muted);
    text-decoration: none;
    transition: color var(--dur-micro) var(--ease-out);
  }

  a:hover {
    color: var(--accent-ink);
  }
`;

export const YearSection = styled.section`
  scroll-margin-top: 6rem;
`;

export const YearHeading = styled.h2`
  margin: 2rem 0 0.5rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--divider);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  font-variant-numeric: tabular-nums;
  color: var(--muted);

  &:first-of-type {
    margin-top: 0;
  }
`;

export const ArchiveNote = styled.article`
  scroll-margin-top: 6rem;
  padding: 1.1rem 0.9rem 1.2rem;
  margin: 0 -0.9rem;
  border-bottom: 1px solid var(--divider);
  border-radius: var(--radius-note);

  &:last-child {
    border-bottom: 0;
  }

  /* Deep links land on a row; keep it marked until the reader moves on. */
  &:target {
    background-color: var(--accent-soft);
  }
`;

export const ArchiveNoteKicker = styled.p`
  margin: 0 0 0.55rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
  color: var(--accent-ink);
`;

export const ArchiveBody = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--ink);
`;

export const ArchiveEmpty = styled.p`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--muted);
`;
