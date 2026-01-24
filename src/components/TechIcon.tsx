import { Code2 } from 'lucide-react';
import React from 'react';

interface Props {
  name: string;
  className?: string;
}

const TechIcon = ({ name, className = "w-6 h-6" }: Props) => {
  const normalizedName = name.trim().toLowerCase();

const specialIcons: Record<string, string> = {
  "laravel": "https://cdn.simpleicons.org/laravel/FF2D20",
  "php": "https://cdn.simpleicons.org/php/777BB4",
  // MySQL: Beddelnah l-Abied (White) bach iban mzyan fo9 l-k7al
  "mysql": "https://cdn.simpleicons.org/mysql/white", 
  "tailwind css": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  "kotlin": "https://cdn.simpleicons.org/kotlin/7F52FF",
  "java": "https://cdn.simpleicons.org/openjdk/white",
  "javascript es6": "https://cdn.simpleicons.org/javascript/F7DF1E",
  "react": "https://cdn.simpleicons.org/react/61DAFB",
  // Composer: Drnah White 7it l-lon l-asli (dark brown) makibanch
  "composer": "https://cdn.simpleicons.org/composer/white",
  "git": "https://cdn.simpleicons.org/git/F05032",
  "nextjs": "https://cdn.simpleicons.org/nextdotjs/white",
  "next.js": "https://cdn.simpleicons.org/nextdotjs/white",

};

  if (specialIcons[normalizedName]) {
    return (
      <img 
        src={specialIcons[normalizedName]} 
        alt={name} 
        className={className} 
        style={{ objectFit: 'contain' }}
      />
    );
  }

  return <Code2 className={className} />;
};

export default TechIcon;