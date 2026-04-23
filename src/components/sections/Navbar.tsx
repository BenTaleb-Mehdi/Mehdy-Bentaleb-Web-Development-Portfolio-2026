import React from 'react';
import * as LucideIcons from 'lucide-react';
import { StaggeredMenu } from '../reactbits/StaggeredMenu';
import portfolioData from '../../data/portfolio.json';
import { useTheme } from '../../lib/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const menuItems = portfolioData.navigation.menuItems;

const socialItems = portfolioData.navigation.socialItems.map(social => ({
  ...social,
  icon: React.createElement((LucideIcons as any)[social.icon], { size: 20 })
}));

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const ThemeToggle = (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full border border-border bg-muted shadow-sm flex items-center justify-center transition-colors text-foreground hover:bg-accent"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );

  return (
    <StaggeredMenu 
      items={menuItems}
      socialItems={socialItems}
      accentColor="#6b7280"
      displaySocials={true}
      displayItemNumbering={true}
      isFixed={true}
      logoText={portfolioData.profile.logoText}
      headerActions={ThemeToggle}
    />
  );
}
