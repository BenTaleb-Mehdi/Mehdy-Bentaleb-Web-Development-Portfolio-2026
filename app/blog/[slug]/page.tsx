import type { Metadata } from 'next';
import { blogPosts } from '@/lib/blogData';
import BlogPostContent from './content';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return {};

  return {
    title: post.title.en + ' | Mehdi Bentaleb',
    description: post.description.en,
    openGraph: {
      title: post.title.en,
      description: post.description.en,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return <BlogPostContent post={post} />;
}
