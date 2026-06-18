// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 text-center text-[#737373] text-sm border-t border-gray-200 mt-12 flex flex-col gap-2 items-center">
      <p>© {new Date().getFullYear()} Mehdi Bentaleb. Crafted in Tangier.</p>
      
      {/* L-Link dyal l-SEO li ghadi y-dkhlo mno Google bots */}
      <Link 
        href="/market-insights" 
        className="text-[#a3a3a3] hover:text-black hover:underline transition-colors text-xs mt-1"
      >
        Morocco Tech Market Insights 2026
      </Link>
    </footer>
  );
}