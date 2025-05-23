import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { serialize } from 'next-mdx-remote/serialize';

export async function serializeMdxWithKatex(source: string) {
  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
      format: 'mdx',
    },
  });
}