import { format, parseISO } from "date-fns";
import { Fragment } from "react";
import useSWR from "swr";

import { fetchContributions } from "@/lib/contributions";
import type { ContributionDay } from "@/lib/contributions";

import { Cell, Fallback, FigCaption, Figure, Grid } from "./styles";

const GITHUB_URL = "https://github.com/rajprakash00";
const SKELETON_WEEKS = 53;

function dayLabel(day: ContributionDay) {
  const date = format(parseISO(day.date), "d MMM yyyy");
  if (day.count === 0) return `No contributions on ${date}`;
  const noun = day.count === 1 ? "contribution" : "contributions";
  return `${day.count} ${noun} on ${date}`;
}

export function ContributionGraph() {
  const { data, error, isLoading } = useSWR(
    "github-contributions",
    fetchContributions,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  if (isLoading) {
    return (
      <Figure aria-busy="true">
        <Grid $weeks={SKELETON_WEEKS} aria-hidden="true">
          {Array.from({ length: SKELETON_WEEKS }, (_, week) => (
            <Fragment key={week}>
              {Array.from({ length: 7 }, (_, day) => (
                <Cell key={day} $level={-1} $skeleton />
              ))}
            </Fragment>
          ))}
        </Grid>
        <FigCaption>loading GitHub activity…</FigCaption>
      </Figure>
    );
  }

  if (error || !data) {
    return (
      <Fallback>
        Couldn&apos;t load GitHub activity right now —{" "}
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          see it on GitHub
        </a>
      </Fallback>
    );
  }

  return (
    <Figure>
      <Grid
        $weeks={data.weeks.length}
        role="img"
        aria-label={`${data.total} GitHub contributions in the last year`}
      >
        {data.weeks.map((week, weekIndex) => (
          <Fragment key={weekIndex}>
            {week.map((day, dayIndex) =>
              day ? (
                <Cell key={dayIndex} $level={day.level} title={dayLabel(day)} />
              ) : (
                <Cell key={dayIndex} $level={-1} />
              )
            )}
          </Fragment>
        ))}
      </Grid>
      <FigCaption>
        {data.total} contributions in the last year ·{" "}
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          github.com/rajprakash00
        </a>
      </FigCaption>
    </Figure>
  );
}
