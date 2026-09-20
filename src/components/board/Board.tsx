import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { useSeason } from "@/components/season";
import {
  BOARD_CANVAS_LIMIT,
  NOTE_CATEGORY_LABELS,
  canvasOrdinal,
  canvasesFromNotes,
  notesForCanvas,
  yearsWithNotes,
} from "@/data/board";
import type { BoardCanvas, BoardNote } from "@/data/board";
import { SEASONS } from "@/lib/season";
import type { Season } from "@/lib/season";

import {
  ArchiveBar,
  ArchiveCount,
  ArchiveGroup,
  ArchiveLink,
  ArchiveOption,
  BoardHeader,
  BoardKicker,
  BoardLede,
  BoardMeta,
  BoardSection,
  BoardTitle,
  Canvas,
  EmptyCanvas,
  FlipButton,
  FlipControls,
  FlipStage,
  Note,
  NoteBody,
  NoteKicker,
  NotesGrid,
  SkeletonNote,
  YearLabel,
  YearStepper,
} from "./styles";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Signature moment: rotator flip between seasonal canvases (DESIGN.md §4). */
const FLIP_VARIANTS: Variants = {
  enter: { opacity: 0, rotateY: 88 },
  center: { opacity: 1, rotateY: 0 },
  exit: { opacity: 0, rotateY: -88 },
};

const GRID_VARIANTS: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const NOTE_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

const STILL_GRID: Variants = { hidden: {}, show: {} };

const STILL_NOTE: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

type Placement = { span: number; start?: number; tilt: number };

/** One shared 1–6 composition; seasonal character lives in the tokens. */
const CANVAS_PLACEMENTS: Record<number, Placement[]> = {
  1: [{ span: 4, start: 2, tilt: -0.8 }],
  2: [
    { span: 3, tilt: -1.1 },
    { span: 3, start: 4, tilt: 1 },
  ],
  3: [
    { span: 3, tilt: -1.2 },
    { span: 3, start: 4, tilt: 1 },
    { span: 2, start: 3, tilt: -0.6 },
  ],
  4: [
    { span: 3, tilt: -1.2 },
    { span: 3, start: 4, tilt: 1 },
    { span: 2, tilt: -0.5 },
    { span: 2, start: 5, tilt: 0.9 },
  ],
  5: [
    { span: 3, tilt: -1.1 },
    { span: 3, start: 4, tilt: 1 },
    { span: 2, tilt: -0.5 },
    { span: 2, start: 3, tilt: 0.7 },
    { span: 2, start: 5, tilt: -0.9 },
  ],
  6: [
    { span: 4, tilt: -1.1 },
    { span: 2, start: 5, tilt: 1 },
    { span: 2, tilt: -0.5 },
    { span: 3, start: 4, tilt: 0.7 },
    { span: 2, start: 2, tilt: -0.8 },
    { span: 2, start: 4, tilt: 0.9 },
  ],
};

interface CanvasRef {
  season: Season;
  year: number;
}

function placementsFor(count: number): Placement[] {
  return CANVAS_PLACEMENTS[
    Math.min(Math.max(count, 1), BOARD_CANVAS_LIMIT)
  ];
}

function NoteCard({
  note,
  placement,
  animated,
}: {
  note: BoardNote;
  placement: Placement;
  animated: boolean;
}) {
  return (
    <Note
      $span={placement.span}
      $start={placement.start}
      $tilt={placement.tilt}
      variants={animated ? NOTE_VARIANTS : STILL_NOTE}
    >
      <NoteKicker>
        {NOTE_CATEGORY_LABELS[note.category]} ·{" "}
        {format(parseISO(note.date), "d MMM yyyy")}
      </NoteKicker>
      <NoteBody>{note.body}</NoteBody>
    </Note>
  );
}

export function Board({ notes }: { notes: BoardNote[] }) {
  const { season } = useSeason();
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [canvas, setCanvas] = useState<CanvasRef | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // The theme season owns the board by default; switching it snaps back to
  // that season of the current year. Browsing clicks stay local.
  useEffect(() => {
    if (!season) return;
    setCanvas({ season, year: new Date().getFullYear() });
  }, [season]);

  // Reduced motion is only trusted after mount so SSR and hydration agree.
  const reduce = mounted && prefersReducedMotion === true;
  const reveal = mounted && !reduce;

  const canvases = useMemo(() => canvasesFromNotes(notes), [notes]);
  const canvasCounts = useMemo(
    () =>
      new Map(
        canvases.map((c) => [`${c.year}-${c.season}`, c.count] as const)
      ),
    [canvases]
  );
  const years = useMemo(() => {
    const list = yearsWithNotes(notes);
    if (canvas && !list.includes(canvas.year)) {
      return [...list, canvas.year].sort((a, b) => a - b);
    }
    return list;
  }, [notes, canvas]);

  const activeNotes = useMemo(
    () => (canvas ? notesForCanvas(notes, canvas.season, canvas.year) : []),
    [notes, canvas]
  );
  const visibleNotes = activeNotes.slice(0, BOARD_CANVAS_LIMIT);
  const hiddenCount = activeNotes.length - visibleNotes.length;
  const yearIndex = canvas ? years.indexOf(canvas.year) : -1;

  const selectSeason = (next: Season) => {
    setCanvas((current) => ({
      season: next,
      year: current?.year ?? new Date().getFullYear(),
    }));
  };

  const stepCanvas = (delta: number) => {
    if (!canvas || canvases.length === 0) return;
    const from = canvasOrdinal(canvas.season, canvas.year);
    let next: BoardCanvas;
    if (delta > 0) {
      next =
        canvases.find((c) => canvasOrdinal(c.season, c.year) > from) ??
        canvases[0];
    } else {
      const earlier = canvases.filter(
        (c) => canvasOrdinal(c.season, c.year) < from
      );
      next = earlier.length ? earlier[earlier.length - 1] : canvases[canvases.length - 1];
    }
    setCanvas({ season: next.season, year: next.year });
  };

  const stepYear = (delta: number) => {
    if (yearIndex === -1) return;
    const next = years[yearIndex + delta];
    if (next === undefined) return;
    setCanvas((current) => (current ? { ...current, year: next } : current));
  };

  const onSeasonKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!canvas || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
    e.preventDefault();
    const current = SEASONS.indexOf(canvas.season);
    const next =
      SEASONS[
        (current + (e.key === "ArrowRight" ? 1 : -1) + SEASONS.length) %
          SEASONS.length
      ];
    selectSeason(next);
    document.getElementById(`board-archive-${next}`)?.focus();
  };

  const canvasView =
    canvas === null ? (
      <Canvas aria-busy="true">
        <NotesGrid aria-hidden="true">
          {placementsFor(3).map((placement, index) => (
            <SkeletonNote
              key={index}
              $span={placement.span}
              $start={placement.start}
              $tilt={placement.tilt}
            />
          ))}
        </NotesGrid>
      </Canvas>
    ) : activeNotes.length === 0 ? (
      <Canvas>
        <EmptyCanvas>
          Nothing pinned to {canvas.season} {canvas.year} yet.
        </EmptyCanvas>
      </Canvas>
    ) : (
      <Canvas>
        <motion.div
          variants={reveal ? GRID_VARIANTS : STILL_GRID}
          initial={reveal ? "hidden" : false}
          animate="show"
        >
          <NotesGrid>
            {visibleNotes.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                placement={placementsFor(visibleNotes.length)[index]}
                animated={reveal}
              />
            ))}
          </NotesGrid>
        </motion.div>
      </Canvas>
    );

  return (
    <BoardSection aria-labelledby="board-title">
      <BoardHeader>
        <BoardTitle id="board-title">Pinned</BoardTitle>
        <BoardLede>
          Field notes, kept lines, and reminders to myself, filed by season.
        </BoardLede>
      </BoardHeader>

      <ArchiveBar>
        <ArchiveGroup
          role="radiogroup"
          aria-label={
            canvas ? `Pinned archive for ${canvas.year}` : "Pinned archive"
          }
          onKeyDown={onSeasonKeyDown}
        >
          {SEASONS.map((s) => {
            const active = canvas?.season === s;
            return (
              <ArchiveOption
                key={s}
                id={`board-archive-${s}`}
                type="button"
                role="radio"
                aria-checked={active}
                tabIndex={canvas === null || active ? 0 : -1}
                $active={active}
                onClick={() => selectSeason(s)}
              >
                <span>{s}</span>
                <ArchiveCount aria-hidden="true">
                  {canvas ? canvasCounts.get(`${canvas.year}-${s}`) ?? 0 : 0}
                </ArchiveCount>
              </ArchiveOption>
            );
          })}
        </ArchiveGroup>

        <YearStepper>
          <FlipButton
            type="button"
            aria-label="Previous year"
            disabled={!canvas || yearIndex <= 0}
            onClick={() => stepYear(-1)}
          >
            <FiChevronLeft aria-hidden="true" />
          </FlipButton>
          <YearLabel>{canvas?.year ?? "—"}</YearLabel>
          <FlipButton
            type="button"
            aria-label="Next year"
            disabled={!canvas || yearIndex === -1 || yearIndex >= years.length - 1}
            onClick={() => stepYear(1)}
          >
            <FiChevronRight aria-hidden="true" />
          </FlipButton>
        </YearStepper>

        <ArchiveLink>
          <Link href="/board/archive">all notes →</Link>
        </ArchiveLink>

        <FlipControls>
          <FlipButton
            type="button"
            aria-label="Previous canvas"
            onClick={() => stepCanvas(-1)}
          >
            <FiChevronLeft aria-hidden="true" />
          </FlipButton>
          <FlipButton
            type="button"
            aria-label="Next canvas"
            onClick={() => stepCanvas(1)}
          >
            <FiChevronRight aria-hidden="true" />
          </FlipButton>
        </FlipControls>
      </ArchiveBar>

      <FlipStage>
        {reduce || canvas === null ? (
          canvasView
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${canvas.year}-${canvas.season}`}
              variants={FLIP_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: EASE_OUT }}
            >
              {canvasView}
            </motion.div>
          </AnimatePresence>
        )}
      </FlipStage>

      <BoardMeta role="status">
        {canvas === null ? (
          "pinning the notes"
        ) : activeNotes.length === 0 ? (
          `nothing pinned to ${canvas.season} ${canvas.year} yet`
        ) : hiddenCount > 0 ? (
          <>
            {visibleNotes.length} of {activeNotes.length} notes ·{" "}
            <Link href={`/board/archive#${activeNotes[0].id}`}>
              see all {activeNotes.length} →
            </Link>
          </>
        ) : (
          `${activeNotes.length} ${
            activeNotes.length === 1 ? "note" : "notes"
          } on the ${canvas.season} ${canvas.year} canvas`
        )}
      </BoardMeta>
    </BoardSection>
  );
}
