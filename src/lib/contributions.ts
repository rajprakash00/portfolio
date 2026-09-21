import { parseISO } from "date-fns";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  date: string;
  count: number;
  level: ContributionLevel;
}

export interface ContributionCalendar {
  total: number;
  weeks: (ContributionDay | null)[][];
}

const API_URL =
  "https://github-contributions-api.jogruber.de/v4/rajprakash00?y=last";
const CACHE_KEY = "contributions:last-year";

interface ApiResponse {
  total: { lastYear: number };
  contributions: ContributionDay[];
}

export function toWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = [];

  for (const day of days) {
    const dayOfWeek = parseISO(day.date).getDay();
    if (dayOfWeek === 0 && week.length > 0) {
      weeks.push(week);
      week = [];
    }
    if (weeks.length === 0 && week.length === 0) {
      for (let i = 0; i < dayOfWeek; i++) week.push(null);
    }
    week.push(day);
  }

  if (week.length > 0) weeks.push(week);
  return weeks;
}

export async function fetchContributions(): Promise<ContributionCalendar> {
  if (typeof window !== "undefined") {
    try {
      const cached = window.sessionStorage.getItem(CACHE_KEY);
      if (cached) return JSON.parse(cached) as ContributionCalendar;
    } catch {
      /* storage unavailable */
    }
  }

  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`GitHub contributions API: ${response.status}`);
  }

  const payload = (await response.json()) as ApiResponse;
  const calendar: ContributionCalendar = {
    total: payload.total.lastYear,
    weeks: toWeeks(payload.contributions),
  };

  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(calendar));
    } catch {
      /* storage unavailable */
    }
  }

  return calendar;
}
