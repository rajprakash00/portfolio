import { Center } from "@/styles/layout";
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

  const { data: views, isLoading } = useQuery({
    queryKey: ["page_views", slug],
    // always call handleViewCount in both envs — it increments + returns count
    queryFn: () => handleViewCount(slug),
    staleTime: Infinity,
  });

  const currentViews = views?.views_count ?? 0;
  return (
    <Center>
      {isLoading ? (
        <ViewsMark>Getting views count</ViewsMark>
      ) : (
        <>
          <ViewsMark>{currentViews} views! Thanks for coming by 🙌</ViewsMark>
        </>
      )}
    </Center>
  );
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

const ViewsMark = styled.mark`
  margin-top: 50px;
  font-weight: 500;
  font-style: italic;
  background:
    linear-gradient(
      104deg,
      rgba(130, 255, 173, 0) 0.9%,
      rgba(130, 255, 173, 1.25) 2.4%,
      rgba(130, 255, 173, 0.5) 5.8%,
      rgba(130, 255, 173, 0.1) 93%,
      rgba(130, 255, 173, 0.7) 96%,
      rgba(130, 255, 1732, 0) 98%
    ),
    linear-gradient(
      183deg,
      rgba(130, 255, 173, 0) 0%,
      rgba(130, 255, 173, 0.3) 7.9%,
      rgba(130, 255, 173, 0) 15%
    );
  padding: 0.4em 14.7px;
  border-radius: 7.5px;
  color: var(--text-color-primary);
`;
