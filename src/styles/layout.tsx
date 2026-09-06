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