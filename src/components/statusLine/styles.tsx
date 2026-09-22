import styled from "styled-components";

export const StatusWrap = styled.div`
  display: grid;
  gap: 0.5rem;
  margin: 0.25rem 0 1.75rem;
`;

export const StatusKicker = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--accent-ink);
`;

export const StatusPulse = styled.span`
  flex: none;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-ink);
  animation: status-pulse 2.4s ease-in-out infinite;

  @keyframes status-pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.45;
      transform: scale(0.8);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const StatusBody = styled.p`
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--ink);

  a {
    color: var(--accent-ink);
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: color-mix(in srgb, var(--accent) 45%, transparent);
  }

  a:hover {
    text-decoration-color: currentColor;
  }
`;
