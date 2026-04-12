"use client";

import Image from "next/image";
import { Globe, Shield, Cpu, ArrowUp, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#020617] pt-24 pb-12 px-6 overflow-hidden mt-20">
      {/* Decorative section boundary */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Branding */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <div className="relative h-10 w-40 brightness-[1.3] filter drop-shadow-[0_0_8px_rgba(45,212,191,0.3)]">
              <Image 
                src="/logo.png" 
                alt="EduSync" 
                fill 
                sizes="160px"
                className="object-contain object-left" 
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Advancing student focus through unified research and deep integration. Reclaiming the academic experience.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-teal-400 hover:border-teal-400/30 transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-teal-400 hover:border-teal-400/30 transition-all">
                <Shield className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-teal-400 hover:border-teal-400/30 transition-all">
                <Cpu className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Event Details */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">The Event</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-3 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                April 16, 2026 · 5:00 PM
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                Microsoft Teams Live
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                Certificate included
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><button onClick={() => document.getElementById('learn')?.scrollIntoView({behavior:'smooth'})} className="text-slate-400 hover:text-white transition-colors">Curriculum</button></li>
              <li><button onClick={() => document.getElementById('speaker')?.scrollIntoView({behavior:'smooth'})} className="text-slate-400 hover:text-white transition-colors">The Speaker</button></li>
              <li><button onClick={() => document.getElementById('register')?.scrollIntoView({behavior:'smooth'})} className="text-slate-400 hover:text-white transition-colors">Registration</button></li>
            </ul>
          </div>

          {/* Column 4: Contact/Back to top */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Contact</h4>
            <a href="mailto:maxhd303@gmail.com" className="flex items-center gap-3 p-4 rounded-xl bg-teal-400/5 border border-teal-400/10 text-teal-400 hover:bg-teal-400/10 transition-all">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-semibold">Get in Touch</span>
            </a>
            <button 
              onClick={scrollToTop}
              className="mt-2 flex items-center gap-2 text-slate-500 hover:text-white transition-all text-sm group"
            >
              <div className="p-2 rounded-full border border-white/5 group-hover:border-white/20">
                <ArrowUp className="w-4 h-4" />
              </div>
              Back to top
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-xs font-mono tracking-wider">
            © {new Date().getFullYear()} EDUSYNC · RESEARCH & DEVELOPMENT
          </p>
          <div className="flex items-center gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-slate-300">Privacy Protocol</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Ethics Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
