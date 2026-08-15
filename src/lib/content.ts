import { readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

const PAGES_DIRECTORY = path.join(process.cwd(), "src", "contents", "pages");

export async function getContentPage(
  slug: "about" | "intro"
): Promise<MDXRemoteSerializeResult> {
  const source = await readFile(path.join(PAGES_DIRECTORY, `${slug}.mdx`), "utf8");
  const { content } = matter(source);

  return serialize(content);
}
