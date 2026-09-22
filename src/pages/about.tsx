import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import styled from "styled-components";

import { SocialLinksOverlay } from "@/components/icons";
import { JourneyVine } from "@/components/journey";
import { MDXComponents } from "@/components/mdx";
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
      <Hero>
        <Title>About me</Title>
        <Lede>
          I started out writing React and shipping product features. These days
          I build LLM systems end to end: retrieval, evals, cost tracking, and a
          human approving anything that writes. The through-line is the same as
          it was on the frontend: I like knowing whether the thing actually
          works.
        </Lede>
      </Hero>
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

const Hero = styled.header`
  max-width: var(--max-width);
  padding: 2.4rem 0 0.5rem;
`;

const Title = styled.h1`
  margin: 0;
  padding-top: 0;
  font-size: clamp(2.2rem, 5vw, 3rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--ink);
`;

const Lede = styled.p`
  margin: 1rem 0 0;
  max-width: 56ch;
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--muted);
`;

const Prose = styled.div`
  margin-top: 3.2rem;
`;
