// components/Blog.tsx
'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { blogPosts } from '@/lib/blogData';
import Link from 'next/link';

export default function Blog() {
  const { language } = useLanguage();

  const localTexts = {
    en: { title: "Writing.", sub: "Thoughts on software development, design, and web ecosystem.", read: "Read full article →" },
    fr: { title: "Blog.", sub: "Réflexions sur le développement logiciel, le design et la tech.", read: "Lire l'article →" },
    es: { title: "Blog.", sub: "Reflexiones sobre desarrollo de software, diseño y tecnología.", read: "Leer artículo →" }
  };

  const text = localTexts[language] || localTexts.en;

  return (
    <section id="blog" className="py-24 px-6 md:px-24 max-w-7xl mx-auto border-t border-gray-100">
      <div className="max-w-3xl mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-4xl font-light mb-4 text-[#111111] tracking-tight"
        >
          {text.title}
        </motion.h2>
        <p className="text-[#737373] font-light text-lg">{text.sub}</p>
      </div>

      <div className="space-y-12">
        {blogPosts.map((post, index) => {
          const title = post.title[language] || post.title.en;
          const description = post.description[language] || post.description.en;

          return (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-baseline justify-between gap-4"
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-xs font-medium text-gray-400">{post.date}</span>
                  <span className="text-xs font-medium text-gray-400">•</span>
                  <span className="text-xs font-medium text-gray-400">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-medium text-[#111111] mb-2">
                  {title}
                </h3>
                
                <p className="text-sm text-[#737373] font-light leading-relaxed mb-4">
                  {description}
                </p>

                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-sm font-medium text-[#111111] hover:text-gray-500 underline underline-offset-4 transition-colors"
                >
                  {text.read}
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-50 border border-gray-100 text-[#111111] px-2.5 py-1 rounded-md font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}