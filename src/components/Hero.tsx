"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Monitor, ChevronRight } from "lucide-react";

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100vh] pt-32 pb-20 px-4 overflow-hidden flex items-center bg-transparent">
      
      {/* Premium Generated Background Image Layer with Seamless Fade */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.4] mix-blend-screen [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"
        style={{ backgroundImage: 'url("/hero-bg.png")' }}
      />
      
      {/* Gentle horizontal fade to ensure text readability without hard block lines */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#020617]/80 via-transparent to-transparent pointer-events-none" />

      {/* ── Main Content Container ─────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
        {/* Left Column: Text & CTA */}
        <div className="flex flex-col items-start text-left">
          
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2 max-w-3xl"
          >
            <span className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white drop-shadow-sm leading-[1.05]">
              Mastering Time <br className="hidden sm:block"/>Management
            </span>
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300 pb-2 mt-2">
              Introducing EduSync
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg sm:text-xl text-slate-400 max-w-xl leading-relaxed"
          >
            Conquer your study workload and beat digital fragmentation. 
            <strong className="text-slate-200 font-medium block mt-2">Join us live and discover the tools that change everything.</strong>
          </motion.p>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full"
          >
            <button
              onClick={scrollToForm}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-teal-400 text-slate-950 font-bold text-lg tracking-wide transition-all duration-300 hover:bg-teal-300 hover:scale-[1.02] shadow-[0_0_30px_rgba(45,212,191,0.25)] hover:shadow-[0_0_40px_rgba(45,212,191,0.4)]"
            >
              Claim Your Spot
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <div className="flex flex-col gap-1.5 text-slate-500 text-sm font-medium">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 opacity-80" /> 100% Free to Join
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 opacity-80" /> Strictly Limited Seats
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Event Info VIP Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0 relative group"
        >
          {/* Card glow behind */}
          <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-teal-500/20 to-blue-500/20 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
          
          <div className="relative p-8 sm:p-10 rounded-[2rem] glass border border-white/10 shadow-2xl overflow-hidden bg-slate-900/60 backdrop-blur-2xl">
            {/* Inner subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-blue-500/5" />
            
            <div className="relative flex flex-col gap-8">
              
              {/* Card Header */}
              <div className="pb-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">Webinar Event Details</h3>
                <p className="text-sm text-slate-400">Everything you need to know to attend.</p>
              </div>

              {/* Card Items */}
              <div className="flex flex-col gap-6">
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-teal-500/10 p-3 rounded-xl border border-teal-500/20">
                    <Calendar className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-0.5">Date</p>
                    <p className="text-lg font-semibold text-slate-200">March 16, 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20">
                    <Clock className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-0.5">Time & Duration</p>
                    <p className="text-lg font-semibold text-slate-200">5:00 PM – 6:00 PM <span className="text-sm text-cyan-400/80 font-normal ml-1">(60 mins)</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                    <Monitor className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-0.5">Platform</p>
                    <p className="text-lg font-semibold text-slate-200">Microsoft Teams Live</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
