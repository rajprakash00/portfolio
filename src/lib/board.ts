import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { compareNotesDescending, isNoteCategory } from "@/data/board";
import type { BoardNote } from "@/data/board";
import { getSeasonByMonth } from "@/lib/season";

const NOTES_DIRECTORY = path.join(process.cwd(), "src", "contents", "board");

/** Gitignored, dev-only. Never read in a production build. */
const STRESS_FIXTURE = path.join(
  process.cwd(),
  "src",
  "data",
  "board.stress.json"
);

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function readDate(raw: unknown, file: string): string {
  // gray-matter parses unquoted YAML dates into Date objects.
  const date = raw instanceof Date ? raw.toISOString().slice(0, 10) : String(raw ?? "");
  if (!ISO_DATE.test(date)) {
    throw new Error(`Board note "${file}" needs a date as YYYY-MM-DD`);
  }
  return date;
}

async function getAllNotes(): Promise<BoardNote[]> {
  const files = await readdir(NOTES_DIRECTORY);
  const notes = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file): Promise<BoardNote> => {
        const id = file.slice(0, -".md".length);
        const source = await readFile(path.join(NOTES_DIRECTORY, file), "utf8");
        const { data, content } = matter(source);

        if (!isNoteCategory(data.category)) {
          throw new Error(
            `Board note "${file}" needs category: field-notes | writings | reminders`
          );
        }

        const body = content.trim();
        if (!body) {
          throw new Error(`Board note "${file}" has an empty body`);
        }

        const date = readDate(data.date, file);
        const [year, month] = date.split("-").map(Number);

        return {
          id,
          season: getSeasonByMonth(month - 1),
          year,
          category: data.category,
          date,
          body,
        };
      })
  );
  return notes;
}

async function getStressNotes(): Promise<BoardNote[]> {
  if (process.env.NODE_ENV !== "development") return [];

  try {
    const parsed: unknown = JSON.parse(await readFile(STRESS_FIXTURE, "utf8"));
    // The fixture is hand-written; trust it only enough to render.
    return Array.isArray(parsed) ? (parsed as BoardNote[]) : [];
  } catch {
    return [];
  }
}

/** Everything a board or archive page renders: real notes plus the stress fixture. */
export async function getBoardNotes(): Promise<BoardNote[]> {
  const [notes, stress] = await Promise.all([getAllNotes(), getStressNotes()]);
  return [...notes, ...stress].sort(compareNotesDescending);
}
