import React from "react";

import { DocumentHead } from "@/components/shared/seo";
import { Center, Container } from "@/styles/layout";

const Blog = () => {
  return (
    <>
      <DocumentHead title="Blogs" />
      <Container className="content about">
        <Center>
          <h2>Coming Soon! ⌛</h2>
          <br />
          <br />
          <p>I swear I have written first 10 lines of ... 😓</p>
        </Center>
        {/* <Component components={{...MDXComponents }} /> */}
      </Container>
    </>
  );
};
export default Blog;
