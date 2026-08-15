import React from "react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

import { DocumentHead } from "@/components/shared/seo";
import { Center, Container } from "@/styles/layout";
import { SocialLinksOverlay } from "@/components/icons";
import { MDXComponents } from "@/components/mdx";
import { ViewCounter } from "@/components/viewCounter";
import { TitleHighlight } from "@/components/shared/typography";
import { getContentPage } from "@/lib/content";

interface AboutProps {
  page: MDXRemoteSerializeResult;
}
const About = ({ page }: AboutProps) => {
  return (
    <>
      <DocumentHead title="About Me" />
      <Container className="content about">
        <Center>
          <h2>About <TitleHighlight>Me! 🙋‍♂️</TitleHighlight></h2>
        </Center>
        <MDXRemote
          {...page}
          components={{ SocialLinksOverlay, ...MDXComponents }}
        />
        <ViewCounter />
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const page = await getContentPage("about");
  return { props: { page } };
}
export default About;
