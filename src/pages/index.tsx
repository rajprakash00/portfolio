import React from "react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

import { DocumentHead } from "@/components/shared/seo";
import { Container, Center } from "@/styles/layout";
import { MDXComponents } from "@/components/mdx";
import { ViewCounter } from "@/components/viewCounter";
import { TitleHighlight } from "@/components/shared/typography";
import { getContentPage } from "@/lib/content";

interface HomeProps {
  page: MDXRemoteSerializeResult;
}
const Home = ({ page }: HomeProps) => {
  return (
    <>
      <DocumentHead title="Home" />
      <Container className="content intro">
        <Center>
          <h2>Hello , I&apos;m <TitleHighlight> Raj! 👋</TitleHighlight></h2>
        </Center>

        <MDXRemote {...page} components={{ ...MDXComponents }} />
        <ViewCounter />
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const page = await getContentPage("intro");
  return { props: { page } };
}
export default Home;
