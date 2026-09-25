import styled from "styled-components";

interface PageHeroProps {
  title: string;
  lede: string;
}

/** Page-opening title + lede on the reading column. */
export function PageHero({ title, lede }: PageHeroProps) {
  return (
    <Hero>
      <Title>{title}</Title>
      <Lede>{lede}</Lede>
    </Hero>
  );
}

const Hero = styled.header`
  max-width: var(--max-width);
  padding: 2.4rem 0 0.5rem;
`;

const Title = styled.h1`
  margin: 0;
  padding-top: 0;
  font-size: clamp(2.2rem, 5vw, 3rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--ink);
`;

const Lede = styled.p`
  margin: 1rem 0 0;
  max-width: 56ch;
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--muted);
`;
