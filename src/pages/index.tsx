import React from "react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

import { ContributionGraph } from "@/components/contributions";
import { DocumentHead } from "@/components/shared/seo";
import { Center } from "@/styles/layout";
import { MDXComponents } from "@/components/mdx";
import { StatusLine } from "@/components/statusLine";
import { TitleHighlight } from "@/components/shared/typography";
import { getContentPage } from "@/lib/content";

interface HomeProps {
  page: MDXRemoteSerializeResult;
}
const Home = ({ page }: HomeProps) => {
  return (
    <>
      <DocumentHead title="Home" />
      <div className="content intro">
        <Center>
          <h2>Hello, I&apos;m <TitleHighlight>Raj!</TitleHighlight> 👋</h2>
        </Center>

        <StatusLine />

        <MDXRemote
          {...page}
          components={{ ContributionGraph, ...MDXComponents }}
        />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const page = await getContentPage("intro");
  return { props: { page } };
}
export default Home;
