import styled from "styled-components";

const Header = styled.header`
  max-width: 52ch;
  margin-bottom: 1.6rem;
`;

const Kicker = styled.p`
  margin: 0 0 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--accent-ink);
`;

const Title = styled.h2`
  margin: 0;
  padding-top: 0;
  font-size: clamp(1.7rem, 3.4vw, 2.3rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--ink);
`;

const Lede = styled.p`
  margin: 0.7rem 0 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--muted);
`;

interface SectionHeaderProps {
  title: string;
  kicker?: string;
  lede?: string;
}

export function SectionHeader({ title, kicker, lede }: SectionHeaderProps) {
  return (
    <Header>
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <Title>{title}</Title>
      {lede ? <Lede>{lede}</Lede> : null}
    </Header>
  );
}
