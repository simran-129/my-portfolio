import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative min-h-screen w-full min-w-0 bg-cream"
    >
      <div className="grain-overlay" aria-hidden />
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="relative z-[2] w-full border-t border-slate-200/80 px-6 py-10 text-center text-xs text-slate-400 sm:px-8 lg:px-10">
        Built with React + Tailwind · Deployed on Vercel
      </footer>
    </motion.div>
  );
}
