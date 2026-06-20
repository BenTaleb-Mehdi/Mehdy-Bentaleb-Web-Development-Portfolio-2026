'use client';
import { useLanguage } from '@/context/LanguageContext';
import { blogPosts } from '@/lib/blogData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function BlogListContent() {
  const { language } = useLanguage();

  const localTexts = {
    en: { title: 'Blog', sub: 'Thoughts on software development, design, and web ecosystem.' },
    fr: { title: 'Blog', sub: 'R\u00e9flexions sur le d\u00e9veloppement logiciel, le design et la tech.' },
    es: { title: 'Blog', sub: 'Reflexiones sobre desarrollo de software, dise\u00f1o y tecnolog\u00eda.' },
  };

  const text = localTexts[language] || localTexts.en;

  return (
    <div className="min-h-screen bg-white text-[#111111] antialiased">
      <Navbar />
      <main className="pt-40 pb-24 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-16">
            <h1 className="text-3xl md:text-4xl font-light mb-4 text-[#111111] tracking-tight">
              {text.title}
            </h1>
            <p className="text-[#737373] font-light text-lg">{text.sub}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post, index) => {
              const title = post.title[language] || post.title.en;
              const description = post.description[language] || post.description.en;

              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block h-full border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3 text-xs font-medium text-gray-400">
                      <span>{post.date}</span>
                      <span>&bull;</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-lg font-medium text-[#111111] mb-2 leading-snug">
                      {title}
                    </h2>

                    <p className="text-sm text-[#737373] font-light leading-relaxed mb-4 line-clamp-3">
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-50 border border-gray-100 text-[#111111] px-2.5 py-1 rounded-md font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
