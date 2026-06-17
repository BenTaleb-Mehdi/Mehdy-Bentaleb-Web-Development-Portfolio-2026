// app/page.tsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Blog from "./components/Blog";
import Contact from './components/Contact'; // Jdid
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; // Jdid
import Chatbot from './components/Chatbot'; // Jdid

export default function Home() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen relative selection:bg-[#111111] selection:text-white font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Blog />
      <Contact />
      <Footer />
      
      {/* Floating Elements */}
      <ScrollToTop />
      <Chatbot />
    </main>
  );
}