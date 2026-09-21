import styled from "styled-components";

export const TimelineList = styled.ol`
  display: grid;
  gap: 1.6rem;
  margin: 0.75rem 0 0;
  padding: 0;
  list-style: none;
`;

export const Entry = styled.li`
  display: grid;
  gap: 0.4rem;

  & + & {
    padding-top: 1.6rem;
    border-top: 1px solid var(--divider);
  }
`;

export const Period = styled.span`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
  color: var(--accent-ink);
`;

export const RoleLine = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
`;

export const Role = styled.span`
  font-weight: 600;
  color: var(--ink);
`;

export const Org = styled.span`
  color: var(--muted);
`;

export const ProjectLink = styled.a`
  && {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    color: var(--accent-ink);
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: color-mix(in srgb, var(--accent) 45%, transparent);
  }

  &&:hover {
    text-decoration-color: currentColor;
  }
`;

export const Points = styled.ul`
  display: grid;
  gap: 0.35rem;
  margin: 0.1rem 0 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding-left: 1rem;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--ink);
  }

  li::before {
    content: "";
    position: absolute;
    top: 0.6em;
    left: 0;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--accent);
  }
`;
