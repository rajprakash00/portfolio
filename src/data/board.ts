import { SEASONS } from "@/lib/season";
import type { Season } from "@/lib/season";

export const NOTE_CATEGORIES = ["field-notes", "writings", "reminders"] as const;
export type NoteCategory = (typeof NOTE_CATEGORIES)[number];

export const NOTE_CATEGORY_LABELS: Record<NoteCategory, string> = {
  "field-notes": "field notes",
  writings: "writings",
  reminders: "reminders",
};

export interface BoardNote {
  /** Filename of the note, e.g. `autumn-maple`. */
  id: string;
  /** Derived from `date`; one canvas per season and calendar year. */
  season: Season;
  year: number;
  category: NoteCategory;
  /** ISO date (`YYYY-MM-DD`), the note's only source of time. */
  date: string;
  body: string;
}

/** How many notes a single canvas shows before the archive link takes over. */
export const BOARD_CANVAS_LIMIT = 6;

export function isNoteCategory(value: unknown): value is NoteCategory {
  return (
    typeof value === "string" &&
    (NOTE_CATEGORIES as readonly string[]).includes(value)
  );
}

export function compareNotesDescending(a: BoardNote, b: BoardNote): number {
  return b.date.localeCompare(a.date) || a.id.localeCompare(b.id);
}

export function notesForCanvas(
  notes: BoardNote[],
  season: Season,
  year: number
): BoardNote[] {
  return notes
    .filter((note) => note.season === season && note.year === year)
    .sort(compareNotesDescending);
}

export interface BoardCanvas {
  season: Season;
  year: number;
  count: number;
}

export function canvasOrdinal(season: Season, year: number): number {
  return year * SEASONS.length + SEASONS.indexOf(season);
}

/** Canvases that hold at least one note, oldest first. */
export function canvasesFromNotes(notes: BoardNote[]): BoardCanvas[] {
  const canvases = new Map<string, BoardCanvas>();
  for (const note of notes) {
    const key = `${note.year}-${note.season}`;
    const canvas = canvases.get(key);
    if (canvas) canvas.count += 1;
    else canvases.set(key, { season: note.season, year: note.year, count: 1 });
  }
  return [...canvases.values()].sort(
    (a, b) => canvasOrdinal(a.season, a.year) - canvasOrdinal(b.season, b.year)
  );
}

export function yearsWithNotes(notes: BoardNote[]): number[] {
  return [...new Set(notes.map((note) => note.year))].sort((a, b) => a - b);
}

export function notesGroupedByYearDescending(
  notes: BoardNote[]
): { year: number; notes: BoardNote[] }[] {
  return [...new Set(notes.map((note) => note.year))]
    .sort((a, b) => b - a)
    .map((year) => ({
      year,
      notes: notes
        .filter((note) => note.year === year)
        .sort(compareNotesDescending),
    }));
}
