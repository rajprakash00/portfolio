import Link from "next/link";
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
          <p>
            No long-form posts yet - shorter notes live on the{" "}
            <Link href="/board">pinned board</Link>.
          </p>
        </Center>
      </Container>
    </>
  );
};
export default Blog;
