import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import styled from "styled-components";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { useSeason } from "@/components/season";
import { TIMELINE } from "@/data/timeline";
import { ReadingIndent, WideSection } from "@/styles/layout";
import { useMediaQuery } from "@/lib/useMediaQuery";

import { VineCanvas } from "./vine/VineCanvas";

export function JourneyVine() {
  const season = useSeason().season ?? "spring";
  const isWide = useMediaQuery("(min-width: 765px)");
  const railWidth = isWide ? 120 : 56;

  const wrapRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [growthPoints, setGrowthPoints] = useState<number[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      setSize({ width: wrap.offsetWidth, height: wrap.offsetHeight });
      setGrowthPoints(
        entryRefs.current
          .map((el) => (el ? el.offsetTop + 16 : 0))
          .filter((y) => y > 0)
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    entryRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isWide]);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 0.8", "end 0.7"],
  });

  return (
    <WideSection>
      <ReadingIndent>
        <SectionHeader title="How I got here" />
      </ReadingIndent>
      <Wrap ref={wrapRef}>
        <Rail>
          {size.height > 0 ? (
            <VineCanvas
              width={railWidth}
              height={size.height}
              centerX={railWidth / 2}
              amplitude={isWide ? 17 : 6}
              leafScale={isWide ? 1 : 0.62}
              growthPoints={growthPoints}
              progress={scrollYProgress}
              season={season}
            />
          ) : null}
        </Rail>
        <Entries>
          {TIMELINE.map((entry, index) => (
            <Entry
              key={`${entry.period}-${entry.role}`}
              ref={(el) => {
                entryRefs.current[index] = el;
              }}
            >
              <Period>{entry.period}</Period>
              <RoleLine>
                <Role>{entry.role}</Role>
                {entry.org ? <Org> · {entry.org}</Org> : null}
                {entry.link ? (
                  <ProjectLink
                    href={entry.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    {entry.link.label} →
                  </ProjectLink>
                ) : null}
              </RoleLine>
              <Points>
                {entry.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </Points>
            </Entry>
          ))}
        </Entries>
      </Wrap>
    </WideSection>
  );
}

const Wrap = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  column-gap: 0.9rem;
  margin-top: 1.5rem;

  @media (min-width: 765px) {
    grid-template-columns: 120px minmax(0, 1fr);
    column-gap: 1.6rem;
  }

  @media (min-width: 1000px) {
    grid-template-columns: max(
        0px,
        calc((100% - var(--max-width)) / 2)
      ) minmax(0, 1fr);
  }
`;

const Rail = styled.div`
  position: relative;

  @media (min-width: 1000px) {
    justify-self: end;
    width: min(120px, 100%);
  }
`;

const Entries = styled.ol`
  display: grid;
  gap: 3.4rem;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 1000px) {
    max-width: var(--max-width);
  }
`;

const Entry = styled.li`
  position: relative;
  display: grid;
  gap: 0.4rem;

  &::before {
    content: "";
    position: absolute;
    top: 0.42rem;
    left: -0.9rem;
    width: 0.9rem;
    height: 1px;
    background: color-mix(in srgb, var(--vine) 42%, transparent);
  }

  @media (min-width: 765px) {
    &::before {
      left: -1.6rem;
      width: 1.6rem;
    }
  }
`;

const Period = styled.span`
  position: relative;
  z-index: 1;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
  color: var(--accent-ink);
`;

const RoleLine = styled.p`
  position: relative;
  z-index: 1;
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: var(--ink);
`;

const Role = styled.span`
  color: var(--ink);
`;

const Org = styled.span`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--muted);
`;

const ProjectLink = styled.a`
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

const Points = styled.ul`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0.4rem;
  margin: 0.2rem 0 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding-left: 1rem;
    max-width: 62ch;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--ink);
  }

  li::before {
    content: "";
    position: absolute;
    top: 0.62em;
    left: 0;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--accent);
  }
`;
