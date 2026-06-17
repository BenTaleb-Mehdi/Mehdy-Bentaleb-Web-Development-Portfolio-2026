// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="py-12 text-center text-[#737373] text-sm border-t border-gray-200 mt-12">
      <p>© {new Date().getFullYear()} Mehdi Bentaleb. Crafted in Tangier.</p>
    </footer>
  );
}