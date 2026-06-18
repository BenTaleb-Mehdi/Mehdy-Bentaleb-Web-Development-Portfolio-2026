// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext'; // ZID HADI

export const metadata: Metadata = {
  title: 'Mehdi Bentaleb | Full-Stack Developer',
  description: 'Portfolio of Mehdi Bentaleb, a Full-Stack Developer.',
  verification: {
    google: "mRDjsto03AqqaQ0A_3UJyk8330wcTi2KzblMbi8Lzgs", // 7t l-code li jbty mn Search Console hna
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {/* ZID LanguageProvider HNA */}
        <LanguageProvider>
      
          {children}
     
        </LanguageProvider>
      </body>
    </html>
  );
}