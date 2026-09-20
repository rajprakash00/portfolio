import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useMemo } from "react";

import {
  NOTE_CATEGORY_LABELS,
  notesGroupedByYearDescending,
} from "@/data/board";
import type { BoardNote } from "@/data/board";

import {
  ArchiveBody,
  ArchiveEmpty,
  ArchiveHeader,
  ArchiveKicker,
  ArchiveLede,
  ArchiveNote,
  ArchiveNoteKicker,
  ArchiveSection,
  ArchiveTitle,
  BackLink,
  YearHeading,
  YearJump,
  YearSection,
} from "./styles";

/** Below this many years, the jump nav is noise. */
const MAX_YEARS_BEFORE_JUMP = 3;

export function Archive({ notes }: { notes: BoardNote[] }) {
  const groups = useMemo(() => notesGroupedByYearDescending(notes), [notes]);

  return (
    <ArchiveSection aria-labelledby="archive-title">
      <ArchiveHeader>
        <ArchiveTitle id="archive-title">The wall</ArchiveTitle>
        <ArchiveLede>Every note, newest first.</ArchiveLede>
        <BackLink>
          <Link href="/board">← back to pinned</Link>
        </BackLink>
      </ArchiveHeader>

      {groups.length > MAX_YEARS_BEFORE_JUMP ? (
        <YearJump aria-label="Jump to a year">
          {groups.map(({ year }) => (
            <Link key={year} href={`/board/archive#year-${year}`}>
              {year}
            </Link>
          ))}
        </YearJump>
      ) : null}

      {groups.length === 0 ? (
        <ArchiveEmpty>Nothing pinned yet.</ArchiveEmpty>
      ) : (
        groups.map(({ year, notes: yearNotes }) => (
          <YearSection
            key={year}
            id={`year-${year}`}
            aria-labelledby={`year-${year}-heading`}
          >
            <YearHeading id={`year-${year}-heading`}>{year}</YearHeading>
            {yearNotes.map((note) => (
              <ArchiveNote key={note.id} id={note.id}>
                <ArchiveNoteKicker>
                  {NOTE_CATEGORY_LABELS[note.category]} · {note.season} ·{" "}
                  {format(parseISO(note.date), "d MMM yyyy")}
                </ArchiveNoteKicker>
                <ArchiveBody>{note.body}</ArchiveBody>
              </ArchiveNote>
            ))}
          </YearSection>
        ))
      )}
    </ArchiveSection>
  );
}
