import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  adjustFontFallback: false,
});


export const metadata: Metadata = {
  title: "Mehdi Bentaleb - Full Stack Developer Tangier | Laravel & React",
  description: "Développeur Web Full Stack basé à Tanger, Maroc. Expert en Laravel, React, et solutions digitales performantes.",
  keywords: ["Développeur Web Tanger", "Laravel Expert Morocco", "Full Stack Developer", "Mehdi Bentaleb", "Solicode", "Web Development Tangier", "Création Site Web Maroc"],
  authors: [{ name: "Mehdi Bentaleb" }],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://mehdi-bentaleb.vercel.app",
    title: "Mehdi Bentaleb - Full Stack Developer Tangier",
    description: "Expert Laravel, PHP & React. Création de sites web professionnels à Tanger.",
    siteName: "Mehdi Bentaleb Portfolio",
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
    "url": "https://mehdi-bentaleb.vercel.app",
    "telephone": "+212 630 829 654",
    "email": "Mehdibentaleb548@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tangier",
      "addressCountry": "Morocco"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Solicode & Miage Tangier"
    },
    "sameAs": [
      "https://github.com/mehdy-bentaleb",
      "https://linkedin.com/in/mehdy-bentaleb"
    ],
    "knowsAbout": ["Laravel", "PHP", "React", "Next.js", "MySQL", "Tailwind CSS"]
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

