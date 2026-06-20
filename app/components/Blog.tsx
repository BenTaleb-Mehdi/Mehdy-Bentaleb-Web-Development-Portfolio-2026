// components/Blog.tsx
'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { blogPosts } from '@/lib/blogData';
import Link from 'next/link';

export default function Blog() {
  const { language } = useLanguage();

  const localTexts = {
    en: { title: "Writing.", sub: "Thoughts on software development, design, and web ecosystem.", read: "Read full article →", viewAll: "View all articles →" },
    fr: { title: "Blog.", sub: "Réflexions sur le développement logiciel, le design et la tech.", read: "Lire l'article →", viewAll: "Voir tous les articles →" },
    es: { title: "Blog.", sub: "Reflexiones sobre desarrollo de software, diseño y tecnología.", read: "Leer artículo →", viewAll: "Ver todos los artículos →" }
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

      <div className="grid gap-6 md:grid-cols-2">
        {blogPosts.slice(0, 4).map((post, index) => {
          const title = post.title[language] || post.title.en;
          const description = post.description[language] || post.description.en;

          return (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
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

                <h3 className="text-lg font-medium text-[#111111] mb-2 leading-snug">
                  {title}
                </h3>

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

      {blogPosts.length > 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#111111] border border-gray-200 rounded-xl px-6 py-3 hover:border-gray-400 hover:bg-gray-50 transition-all"
          >
            {text.viewAll}
          </Link>
        </motion.div>
      )}
    </section>
  );
}