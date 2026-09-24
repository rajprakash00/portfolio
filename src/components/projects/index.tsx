import { motion, type Variants } from "framer-motion";

import { useSeason } from "@/components/season";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FEATURED_PROJECTS, PROJECTS, formatAccession } from "@/data/projects";
import type { Project } from "@/data/projects";
import { EASE_OUT } from "@/lib/motion";
import { ReadingIndent, WideSection } from "@/styles/layout";
import type { Season } from "@/lib/season";
import { useReducedMotionAfterMount } from "@/lib/useReducedMotionAfterMount";

import { Specimen } from "./Specimen";
import {
  Habitat,
  HabitatLabel,
  LabelBlock,
  Ledger,
  LedgerRow,
  MeasurementLabel,
  MeasurementList,
  MeasurementRow,
  MeasurementValue,
  Note,
  NoteBody,
  NoteLabel,
  Provenance,
  RowAccession,
  RowMeta,
  RowName,
  RowNameLink,
  RowNameText,
  Sheet,
  SheetLink,
  SheetLinks,
  SheetMeta,
  SheetName,
  SheetNotes,
  SheetState,
  SheetSummary,
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

/** The row's only link: a sheet anchor for featured projects, otherwise wherever the artifact lives. */
function ledgerHref(project: Project) {
  if (project.sheet) return `#${project.slug}`;
  return project.live ?? project.source;
}

export function AccessionLedger() {
  const reduce = useReducedMotionAfterMount();

  return (
    <WideSection>
      <ReadingIndent>
        <SectionHeader title="Accession ledger" />
      </ReadingIndent>
      <ReadingIndent>
        <Ledger>
          {PROJECTS.map((project, index) => {
            const href = ledgerHref(project);
            return (
              <LedgerRow
                key={project.slug}
                variants={reduce ? STILL_VARIANTS : REVEAL_VARIANTS}
                initial={reduce ? false : "hidden"}
                animate={reduce ? "show" : undefined}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  ease: EASE_OUT,
                  delay: reduce ? 0 : index * 0.05,
                }}
              >
                <RowAccession>{formatAccession(project.accession)}</RowAccession>
                <RowName>
                  {href ? (
                    <RowNameLink
                      href={href}
                      {...(project.sheet
                        ? {}
                        : { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {project.name}
                    </RowNameLink>
                  ) : (
                    <RowNameText>{project.name}</RowNameText>
                  )}
                </RowName>
                <RowMeta>{project.family}</RowMeta>
                <RowMeta $state={project.state}>{project.state}</RowMeta>
                <RowMeta>{project.collected}</RowMeta>
              </LedgerRow>
            );
          })}
        </Ledger>
      </ReadingIndent>
    </WideSection>
  );
}

export function SpecimenSheets() {
  const season = useSeason().season ?? "spring";

  return (
    <WideSection>
      <ReadingIndent>
        <SectionHeader title="Specimen sheets" />
      </ReadingIndent>
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
      <SpecimenCell>
        <Specimen
          slug={project.slug}
          season={season}
          state={project.state}
          seedling={seedling}
        />
      </SpecimenCell>
      <LabelBlock
        variants={reduce ? STILL_VARIANTS : REVEAL_VARIANTS}
        initial={reduce ? false : "hidden"}
        animate={reduce ? "show" : undefined}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, margin: "-60px 0px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <SheetName id={`${project.slug}-name`}>{project.name}</SheetName>
        <SheetMeta>
          {project.family} ·{" "}
          <SheetState $state={project.state}>{project.state}</SheetState> ·{" "}
          {project.collected}
        </SheetMeta>
        <SheetSummary>{project.summary}</SheetSummary>
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
      </LabelBlock>
    </Sheet>
  );
}
