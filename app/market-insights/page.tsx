// app/market-insights/page.tsx
import { Metadata } from 'next';
import { seoInsightsData, translations } from '@/lib/data'; // Bdel l-path 3la 7sab projet dyalk
import Link from 'next/link';

// 1. Génération dyal Metadata l-Google
export const metadata: Metadata = {
  title: "Full Stack Developer Jobs & Market Insights in Morocco (2026)",
  description: "Looking for a Developer full stack in Morocco? Discover the latest jobs, salaries, and tech market trends for June 2026. Explore Mehdi Bentaleb's portfolio.",
  keywords: seoInsightsData.relatedSearches,
  openGraph: {
    title: "Morocco Tech Market Insights 2026 | Mehdi Bentaleb",
    description: "Full Stack Developer data and insights in Morocco.",
    type: "article",
  },
};

export default function MarketInsightsPage() {
  const data = seoInsightsData;

  // 2. Schema.org l-Rich Snippets f Google (FAQ)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.peopleAlsoAsk.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.snippet,
      },
    })),
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      {/* Script l-mkhbi dyal l-SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Intro li kat-linki l-Portfolio dyalk (CTA) */}
      <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-6 mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Tech Market Overview: Full Stack Developer in Morocco
        </h1>
        <p className="text-gray-400 mb-6">
          A static report on the current developer market in Morocco. Looking to hire an expert in Laravel & Next.js?
        </p>
        <Link 
          href="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
        >
          View My Portfolio (Mehdi Bentaleb)
        </Link>
      </div>

      {/* FAQ Section (L-7alawa dyal SEO) */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {data.peopleAlsoAsk.map((faq, idx) => (
            <div key={idx} className="bg-gray-800/50 p-5 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-medium text-lg text-white mb-2">{faq.question}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{faq.snippet}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Useful Links (Organic Results) */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
          Top Platforms for Developer Jobs in Morocco
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {data.organic.map((item) => (
            <a 
              key={item.position} 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block p-5 bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700 rounded-lg transition"
            >
              <h3 className="text-blue-400 font-medium mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-3">{item.snippet}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}