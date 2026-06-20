'use client';
import { useLanguage } from '@/context/LanguageContext';
import { type BlogPost } from '@/lib/blogData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';

function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-[#111111]">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderContent(text: string) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key} className="space-y-1.5 mb-6" role="list">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(`list-end-${i}`);
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushList(`list-end-${i}`);
      elements.push(
        <h3 key={i} className="text-xl font-semibold text-[#111111] mt-10 mb-3 leading-snug">
          {formatInline(trimmed.slice(4))}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushList(`list-end-${i}`);
      elements.push(
        <h2 key={i} className="text-2xl font-semibold text-[#111111] mt-12 mb-4 leading-snug">
          {formatInline(trimmed.slice(3))}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith('# ')) {
      flushList(`list-end-${i}`);
      elements.push(
        <h1 key={i} className="text-3xl font-bold text-[#111111] mt-14 mb-6 leading-tight">
          {formatInline(trimmed.slice(2))}
        </h1>
      );
      return;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      listItems.push(
        <li key={`li-${i}`} className="text-[#444444] leading-relaxed pl-1 flex items-start gap-2">
          <span className="text-gray-300 mt-[7px] w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
          <span>{formatInline(trimmed.slice(2))}</span>
        </li>
      );
      return;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      flushList(`list-end-${i}`);
      elements.push(
        <p key={i} className="text-[#444444] leading-[1.8] text-[1.05rem]">
          {formatInline(trimmed)}
        </p>
      );
      return;
    }

    flushList(`list-end-${i}`);
    elements.push(
      <p key={i} className="text-[#444444] leading-[1.8] text-[1.05rem] mb-5">
        {formatInline(trimmed)}
      </p>
    );
  });

  flushList('list-final');

  return elements;
}

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const { language } = useLanguage();

  const title = post.title[language] || post.title.en;
  const content = post.content[language] || post.content.en;

  const backTexts = {
    en: '\u2190 Back to Blog',
    fr: '\u2190 Retour au Blog',
    es: '\u2190 Volver al Blog',
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] antialiased">
      <Navbar />
      <article className="pt-40 pb-24 px-6 mx-auto bg-white">
        <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#111111] transition-colors mb-8 font-medium"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-0.5">
              <path d="M12 7H2M2 7L6 3M2 7L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {backTexts[language] || backTexts.en}
          </Link>

          <div className="flex items-center gap-3 text-sm text-gray-400 mb-4 font-medium">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#111111] leading-[1.15] mb-8">
            {title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-10">
            {renderContent(content)}
          </div>
        </motion.div>
        </div>
      </article>
    </div>
  );
}
