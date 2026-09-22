import Link from "next/link";
import React from "react";

import { DocumentHead } from "@/components/shared/seo";
import { Center } from "@/styles/layout";

const Blog = () => {
  return (
    <>
      <DocumentHead title="Blogs" />
      <div className="content about">
        <Center>
          <h2>Coming Soon! ⌛</h2>
          <br />
          <br />
          <p>
            No long-form posts yet - shorter notes live on the{" "}
            <Link href="/board">pinned board</Link>.
          </p>
        </Center>
      </div>
    </>
  );
};
export default Blog;
