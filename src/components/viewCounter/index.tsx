import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import styled from "styled-components";

export const ViewCounter = () => {
  const { pathname: path } = useRouter();
  const isDev = process.env.NODE_ENV === "development";

  // 1. Safe extraction: If on home page, default slug to "intro" instead of an empty string
  const rawSlug = path.split("/")[1];
  const baseSlug = rawSlug && rawSlug !== "" ? rawSlug : "intro";

  // dev writes go to a prefixed slug → never pollutes prod rows
  const slug = isDev ? `dev__${baseSlug}` : baseSlug;

  const { data: views } = useQuery({
    queryKey: ["page_views", slug],
    // always call handleViewCount in both envs — it increments + returns count
    queryFn: () => handleViewCount(slug),
    staleTime: Infinity,
  });

  const currentViews = views?.views_count;

  if (typeof currentViews !== "number") {
    return null;
  }

  return <ViewsMark>{currentViews.toLocaleString()} views</ViewsMark>;
};

const handleViewCount = async (slug: string) => {
  const reqBody = { page_slug: slug };
  const result = await fetch(`/api/update_views`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  });

  const updatedData = await result.json();

  return updatedData;
};

const ViewsMark = styled.span`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  color: var(--muted);
`;
