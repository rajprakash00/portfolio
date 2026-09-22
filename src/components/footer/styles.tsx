import styled from "styled-components";

export const FooterContainer = styled.footer`
  position: sticky;
  top: 100vh;
  display: grid;
  justify-items: center;
  gap: 0.4rem;
  padding: 0 20px 20px;
  text-align: center;
  font-size: 0.8em;

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

export const FooterNote = styled.p`
  margin: 0;
`;
