"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Curriculum", id: "learn" },
  { label: "Meet the Speaker", id: "speaker" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToObject = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        isScrolled ? "pt-4 px-4" : "pt-0 px-0"
      }`}
    >
      <div className={`mx-auto transition-all duration-700 ease-in-out ${isScrolled ? "max-w-2xl" : "max-w-[100vw]"}`}>
        <div className={`flex items-center justify-between relative overflow-hidden bg-slate-900/60 backdrop-blur-3xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out ${
          isScrolled 
            ? "rounded-full px-6 py-2 border shadow-teal-500/10" 
            : "rounded-none px-8 py-5 border-b shadow-none"
        }`}>
          
          {/* Subtle ambient glow inside the navbar */}
          <div className={`absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-blue-500/10 transition-opacity duration-700 ${isScrolled ? "opacity-50" : "opacity-80"}`} />

          {/* Logo Zone */}
          <div 
            className={`flex items-center gap-3 relative shrink-0 transition-all duration-500 cursor-pointer block ${
              isScrolled 
                ? "min-h-[32px] w-[130px] h-[32px]" 
                : "min-h-[48px] w-[190px] h-[48px]"
            }`} 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Image
              src="/logo.png"
              alt="EduSync Logo"
              fill
              priority
              loading="eager"
              sizes="(max-width: 768px) 130px, 190px"
              className="object-contain object-left origin-left brightness-[1.4] filter drop-shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all duration-500"
            />
          </div>

          {/* Center Links (Desktop only) */}
          <nav className="hidden md:flex items-center gap-8 relative z-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToObject(link.id)}
                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Zone */}
          <div className="relative z-10 flex items-center gap-4">
            <button
              id="nav-register-btn"
              onClick={() => scrollToObject("register")}
              className="px-5 py-2.5 rounded-full bg-white text-slate-950 text-sm font-bold tracking-wide transition-all duration-300 hover:scale-[1.05] hover:bg-teal-400 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)]"
            >
              Reserve Spot
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
