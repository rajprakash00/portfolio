import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import styled from "styled-components";

import { SocialLinksOverlay } from "@/components/icons";
import { JourneyVine } from "@/components/journey";
import { MDXComponents } from "@/components/mdx";
import { PageHero } from "@/components/shared/PageHero";
import { DocumentHead } from "@/components/shared/seo";
import { GardenStack } from "@/components/stack";
import { getContentPage } from "@/lib/content";

interface AboutProps {
  page: MDXRemoteSerializeResult;
}

const About = ({ page }: AboutProps) => {
  return (
    <>
      <DocumentHead title="About Me" />
      <PageHero
        title="About me"
        lede="I started out writing React and shipping product features. These days I build LLM systems end to end: retrieval, evals, cost tracking, and a human approving anything that writes. The through-line is the same as it was on the frontend: I like knowing whether the thing actually works."
      />
      <JourneyVine />
      <GardenStack />
      <Prose>
        <MDXRemote
          {...page}
          components={{ SocialLinksOverlay, ...MDXComponents }}
        />
      </Prose>
    </>
  );
};

export async function getStaticProps() {
  const page = await getContentPage("about");
  return { props: { page } };
}
export default About;

const Prose = styled.div`
  margin-top: 3.2rem;
`;
