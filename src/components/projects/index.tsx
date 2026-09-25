import { motion, type Variants } from "framer-motion";

import { useSeason } from "@/components/season";
import { FEATURED_PROJECTS } from "@/data/projects";
import type { Project } from "@/data/projects";
import { EASE_OUT } from "@/lib/motion";
import { WideSection } from "@/styles/layout";
import type { Season } from "@/lib/season";
import { useReducedMotionAfterMount } from "@/lib/useReducedMotionAfterMount";

import { Specimen } from "./Specimen";
import {
  Habitat,
  HabitatLabel,
  MeasurementLabel,
  MeasurementList,
  MeasurementRow,
  MeasurementValue,
  Note,
  NoteBody,
  NoteLabel,
  Provenance,
  Sheet,
  SheetHead,
  SheetLink,
  SheetLinks,
  SheetMeta,
  SheetName,
  SheetNotes,
  SheetRest,
  SheetState,
  SheetSummary,
  SheetText,
  Sheets,
  SpecimenCell,
} from "./styles";

/** The standard reveal: fade + 16px rise (DESIGN.md §4). */
const REVEAL_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

/** Reduced motion gets the static end-state, no viewport trigger needed. */
const STILL_VARIANTS: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

/** The sheet's text and its supporting blocks reveal the same way, separately. */
function revealProps(reduce: boolean) {
  return {
    variants: reduce ? STILL_VARIANTS : REVEAL_VARIANTS,
    initial: reduce ? (false as const) : ("hidden" as const),
    animate: reduce ? ("show" as const) : undefined,
    whileInView: reduce ? undefined : ("show" as const),
    viewport: { once: true, margin: "-60px 0px" },
    transition: { duration: 0.6, ease: EASE_OUT },
  };
}

export function SpecimenSheets() {
  const season = useSeason().season ?? "spring";

  return (
    <WideSection>
      <Sheets>
        {FEATURED_PROJECTS.map((project) => (
          <SpecimenSheet key={project.slug} project={project} season={season} />
        ))}
      </Sheets>
    </WideSection>
  );
}

function SpecimenSheet({
  project,
  season,
}: {
  project: Project;
  season: Season;
}) {
  const reduce = useReducedMotionAfterMount();
  const seedling = project.sheet === "seedling";

  return (
    <Sheet id={project.slug} aria-labelledby={`${project.slug}-name`}>
      <SheetHead>
        <SpecimenCell>
          <Specimen
            slug={project.slug}
            season={season}
            state={project.state}
            seedling={seedling}
          />
        </SpecimenCell>
        <SheetText {...revealProps(reduce)}>
          <SheetName id={`${project.slug}-name`}>{project.name}</SheetName>
          <SheetMeta>
            {project.family} ·{" "}
            <SheetState $state={project.state}>{project.state}</SheetState> ·{" "}
            {project.collected}
          </SheetMeta>
          <SheetSummary>{project.summary}</SheetSummary>
        </SheetText>
      </SheetHead>
      <SheetRest {...revealProps(reduce)}>
        {project.habitat ? (
          <Habitat>
            <HabitatLabel>habitat</HabitatLabel>
            {project.habitat.join(" · ")}
          </Habitat>
        ) : null}
        {project.measurements ? (
          <>
            <MeasurementList>
              {project.measurements.rows.map((measurement) => (
                <MeasurementRow key={measurement.label}>
                  <MeasurementLabel>{measurement.label}</MeasurementLabel>
                  <MeasurementValue>{measurement.value}</MeasurementValue>
                </MeasurementRow>
              ))}
            </MeasurementList>
            <Provenance>measured · {project.measurements.provenance}</Provenance>
          </>
        ) : null}
        {project.notes ? (
          <SheetNotes>
            {project.notes.map((note) => (
              <Note key={note.label}>
                <NoteLabel>{note.label}</NoteLabel>
                <NoteBody>{note.body}</NoteBody>
              </Note>
            ))}
          </SheetNotes>
        ) : null}
        {project.live || project.source ? (
          <SheetLinks>
            {project.live ? (
              <SheetLink
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                live →
              </SheetLink>
            ) : null}
            {project.source ? (
              <SheetLink
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                source →
              </SheetLink>
            ) : null}
          </SheetLinks>
        ) : null}
      </SheetRest>
    </Sheet>
  );
}
