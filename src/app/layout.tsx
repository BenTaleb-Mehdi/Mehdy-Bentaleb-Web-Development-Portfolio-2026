import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  // Optimized for Local SEO in Tangier
  title: "Mehdi Bentaleb | Full-Stack Developer | Laravel Backend Specialist",
  description: "Full-Stack Web Developer based in Tangier, Morocco. Specialized in Laravel, PHP, and React solutions for businesses.",
  keywords: [
    "Junior Laravel Developer", "Solicode Tangier Graduate","Junior Web Developer",
    "Laravel Expert Morocco", "PHP Developer Tangier", "Full Stack Developer Casablanca",
    "Backend Developer Rabat", "Laravel SaaS Solutions", "Freelance Laravel Developer",
    "Développeur Laravel Maroc", "Web Development Morocco", "Mehdi Bentaleb", "Web Developer Tangier", "Full Stack Developer Morocco" 
  ],
  authors: [{ name: "Mehdi Bentaleb" }],
  verification: {
    google: "mRDjsto03AqqaQ0A_3UJyk8330wcTi2KzblMbi8Lzgs"
  },
  // URL matching your actual Vercel deployment
  metadataBase: new URL("https://mehdi-bentaleb.vercel.app/"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mehdi-bentaleb.vercel.app/",
    title: "Mehdi Bentaleb - Full-Stack Developer Tangier",
    description: "Expert Laravel, PHP & React. Building high-performance web applications in Tangier.",
    siteName: "Mehdi Bentaleb Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Make sure to add this image in your public folder
        width: 1200,
        height: 630,
        alt: "Mehdi Bentaleb Portfolio",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mehdi Bentaleb",
    "jobTitle": "Full Stack Web Developer",
    "url": "https://mehdi-bentaleb.vercel.app/",
    "telephone": "+212 630 829 654",
    "email": "Mehdibentaleb548@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tangier",
      "addressRegion": "Tanger-Tétouan-Al Hoceïma",
      "addressCountry": "MA"
    },
    "alumniOf": [
      { "@type": "EducationalOrganization", "name": "Solicode Tangier" },
      { "@type": "EducationalOrganization", "name": "Miage Tangier" }
    ],
    "sameAs": [
      "https://github.com/mehdy-bentaleb",
      "https://linkedin.com/in/mehdy-bentaleb"
    ],
    "knowsAbout": ["Laravel", "PHP", "React", "Next.js", "MySQL", "Tailwind CSS", "Web Architecture"]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {/* JSON-LD is placed here for better SEO crawling */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}