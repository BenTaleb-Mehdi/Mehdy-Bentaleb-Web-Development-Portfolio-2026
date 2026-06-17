// context/LanguageContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/lib/data';

type Language = 'en' | 'fr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en']; // L-objet li fih l-m3lomat
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // t heya li ghadi tebda te3tina data 3la 7ssab l-logha li khtar l-user
  const t = translations[language]; 

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}