import { motion, useReducedMotion } from "framer-motion";
import styled from "styled-components";

import { useSeason } from "@/components/season";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { STACK_GROUPS } from "@/data/stack";
import { EASE_OUT } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { ReadingIndent, WideSection } from "@/styles/layout";

import { BotanicalGlyph } from "./BotanicalGlyph";

export function GardenStack() {
  const season = useSeason().season ?? "spring";
  const reduce = Boolean(useReducedMotion());
  const isOverhang = useMediaQuery("(min-width: 1000px)");

  return (
    <WideSection>
      <ReadingIndent>
        <SectionHeader title="What I reach for" />
      </ReadingIndent>
      <Beds>
        {STACK_GROUPS.map((group, bedIndex) => (
          <Bed key={group.key}>
            <BedLabelCell>
              <BedLabel>{group.label}</BedLabel>
            </BedLabelCell>
            <BedRow>
              {group.items.map((item, index) => (
                <Plant
                  key={item}
                  initial={reduce ? false : { opacity: 0, y: 16, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px 0px" }}
                  transition={{
                    duration: 0.6,
                    ease: EASE_OUT,
                    delay: (index % 6) * 0.05,
                  }}
                >
                  <GlyphSlot>
                    <BotanicalGlyph
                      season={season}
                      seed={index + bedIndex * 2}
                      size={isOverhang ? 30 : 21}
                      facing={isOverhang ? "up" : "right"}
                    />
                  </GlyphSlot>
                  <ItemName>{item}</ItemName>
                </Plant>
              ))}
            </BedRow>
          </Bed>
        ))}
      </Beds>
    </WideSection>
  );
}

const Beds = styled.div`
  display: grid;
  gap: 1.1rem;
  margin-top: 0.5rem;
`;

const Bed = styled.div`
  --name-size: 0.76rem;

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.2rem;
  padding: 0.7rem 0;

  & + & {
    border-top: 1px solid var(--divider);
  }

  @media (min-width: 1000px) {
    grid-template-columns: max(
        0px,
        calc((100% - var(--max-width)) / 2)
      ) minmax(0, 1fr);
    gap: 0;
    padding: 0;

    & + & {
      border-top: none;
    }
  }
`;

const BedLabelCell = styled.div`
  padding: 0 0 0.2rem;

  @media (min-width: 1000px) {
    align-self: center;
    justify-self: end;
    padding: 0 1.6rem 0 0;
  }
`;

const BedLabel = styled.span`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--accent-ink);
`;

const BedRow = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.6rem 1.2rem;
  padding: 0.2rem 0 0.1rem;

  @media (min-width: 1000px) {
    gap: 1.4rem 2rem;
    padding: 0.6rem 0 0.3rem;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: calc(0.7rem + 1.25 * var(--name-size));
      height: 1px;
      background: color-mix(in srgb, var(--vine) 32%, transparent);
    }
  }
`;

const Plant = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.45rem;

  @media (min-width: 1000px) {
    flex-direction: column;
    gap: 0.4rem;
  }

  &:hover svg {
    transform: rotate(-7deg);
  }

  &:hover span {
    color: var(--ink);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover svg {
      transform: none;
    }
  }
`;

const GlyphSlot = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 1000px) {
    align-items: flex-end;
    height: 34px;
  }

  svg {
    transform-origin: 50% 50%;
    transition: transform var(--dur-micro) var(--ease-out);

    @media (min-width: 1000px) {
      transform-origin: 50% 100%;
    }
  }
`;

const ItemName = styled.span`
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.02em;
  color: color-mix(in srgb, var(--ink) 72%, var(--muted));
  white-space: normal;
  transition: color var(--dur-micro) var(--ease-out);

  @media (min-width: 1000px) {
    white-space: nowrap;
  }
`;
