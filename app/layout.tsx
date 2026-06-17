// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext'; // ZID HADI

export const metadata: Metadata = {
  title: 'Mehdi Bentaleb | Full-Stack Developer',
  description: 'Portfolio of Mehdi Bentaleb, a Full-Stack Developer.',
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