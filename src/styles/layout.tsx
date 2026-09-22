import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr min(var(--max-width), calc(100% - 2rem)) 1fr;
  column-gap: 1rem;
  padding: 0;
  padding-bottom: 30px;

  & > * {
    grid-column: 2;
  }
`;

export const FullHeightWrapper = styled.div`
  min-height: 100dvh;
`

export const Center = styled.div`
	display: grid;
	padding: 0;
	justify-items: center;
`;

/** Full-bleed band inside the page Container (escapes the prose column). */
export const WideSection = styled.section`
  grid-column: 1 / -1;
  justify-self: center;
  width: min(var(--max-width-wide), calc(100% - 2rem));
  margin-top: 3.4rem;
  padding-top: 2.2rem;
  /* border-top: 1px solid var(--divider); */
`;

/**
 * Indents content to the reading column inside a WideSection once the overhang
 * exists. Pure CSS, so the server-rendered layout is already correct.
 */
export const ReadingIndent = styled.div`
  @media (min-width: 1000px) {
    padding-left: max(0px, calc((100% - var(--max-width)) / 2));
  }
`;