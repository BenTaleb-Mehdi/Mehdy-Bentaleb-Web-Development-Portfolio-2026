// app/blog/[slug]/page.tsx
'use client';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { blogPosts } from '@/lib/blogData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';

export default function BlogDetails() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();

  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white text-gray-500 flex flex-col items-center justify-center font-light">
        <p>Post not found.</p>
        <Link href="/" className="mt-4 text-[#111111] underline">Go Back Home</Link>
      </div>
    );
  }

  const title = post.title[language] || post.title.en;
  const content = post.content[language] || post.content.en;

  const backTexts = { en: "← Back to Portfolio", fr: "← Retour au Portfolio", es: "← Volver al Portfolio" };

  return (
    // ⚠️ STABLE LIGHT MODE WRAPPER: Zdna bg-white min-h-screen o blockina l-dark configurations
    <div className="min-h-screen bg-white text-[#111111] antialiased">
      <Navbar />
      <article className="pt-40 pb-24 px-6 max-w-3xl mx-auto font-light bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/#blog" 
            className="text-sm text-gray-400 hover:text-[#111111] transition-colors mb-8 inline-block font-medium"
          >
            {backTexts[language] || backTexts.en}
          </Link>

          <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#111111] leading-[1.15] mb-8">
            {title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-50 border border-gray-100 text-[#111111] px-3 py-1 rounded-md font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* Render Markdown-like content nicely */}
          <div className="text-base text-[#333333] leading-relaxed space-y-6 whitespace-pre-line">
            {content}
          </div>
        </motion.div>
      </article>
    </div>
  );
}