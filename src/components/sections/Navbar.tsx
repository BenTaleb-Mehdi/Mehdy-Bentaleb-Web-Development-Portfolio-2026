import React from 'react';
import * as LucideIcons from 'lucide-react';
import { StaggeredMenu } from '../reactbits/StaggeredMenu';
import portfolioData from '../../data/portfolio.json';

const menuItems = portfolioData.navigation.menuItems;

const socialItems = portfolioData.navigation.socialItems.map(social => ({
  ...social,
  icon: React.createElement((LucideIcons as any)[social.icon], { size: 20 })
}));

export function Navbar() {
  return (
  
    <StaggeredMenu 
      items={menuItems}
      socialItems={socialItems}
      accentColor="#000000"
      displaySocials={true}
      displayItemNumbering={true}
      isFixed={true}
      logoText={portfolioData.profile.logoText}
    />

  );
}
