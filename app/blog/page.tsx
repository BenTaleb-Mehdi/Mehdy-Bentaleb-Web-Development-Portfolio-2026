import type { Metadata } from 'next';
import BlogListContent from './content';

export const metadata: Metadata = {
  title: 'Blog | Mehdi Bentaleb',
  description: 'Thoughts on software development, design, and the web ecosystem.',
  openGraph: {
    title: 'Blog | Mehdi Bentaleb',
    description: 'Thoughts on software development, design, and the web ecosystem.',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogListContent />;
}
