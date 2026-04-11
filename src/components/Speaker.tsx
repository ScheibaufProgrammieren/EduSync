"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  {
    id: "speaker-research",
    title: "EduSync Platform Research",
    description:
      "Actively researching how digital fragmentation impacts students' academic performance and focus.",
  },
  {
    id: "speaker-struggle",
    title: "Understanding Student Struggle",
    description:
      "Focused on connecting scattered academic tools into a unified system that reduces cognitive load.",
  },
  {
    id: "speaker-coordination",
    title: "Project Coordination",
    description:
      "Key contributor to EduSync's core concept — a centralized dashboard connecting LMS and MOOCs.",
  },
  {
    id: "speaker-mobility",
    title: "Sustainable Mobility",
    description:
      "Exploring tech-supported eco-friendly transport solutions tailored for university environments.",
  },
];

export default function Speaker() {
  return (
    <section id="speaker" className="relative py-28 px-4 overflow-hidden">
      {/* Background glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teal-500/6 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-teal-400/40" />
            <span className="text-teal-400 text-xs font-bold tracking-[0.25em] uppercase">
              Meet the Speaker
            </span>
          </div>
        </motion.div>

        {/* Speaker card */}
        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* ── Left: Photo + Identity ───────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
              className="md:w-5/12 flex flex-col items-center justify-end p-10 md:p-12 bg-gradient-to-br from-slate-800/60 to-slate-900/80 border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden min-h-[480px]"
            >
              {/* Decorative teal glow */}
              <div
                aria-hidden
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-teal-400/10 blur-3xl"
              />

              {/* Photo — full bleed bottom-anchored */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-[260px] mx-auto mb-6"
              >
                {/* Gradient ring frame */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-teal-400/0 via-teal-400/0 to-teal-400/30 z-10" />
                <div className="relative overflow-hidden rounded-3xl border border-teal-400/20"
                  style={{ boxShadow: "0 0 40px rgba(45,212,191,0.15), 0 20px 60px rgba(2,6,23,0.6)" }}>
                  <Image
                    src="/speaker.png"
                    alt="Abdul Malik Gamil Mohammed"
                    width={260}
                    height={320}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-2 -right-2 z-20 flex items-center gap-1.5 bg-slate-900 border border-teal-400/30 rounded-full px-3 py-1.5"
                  style={{ boxShadow: "0 0 20px rgba(45,212,191,0.2)" }}>
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-teal-400 text-xs font-bold">Speaker</span>
                </div>
              </motion.div>

              {/* Name & title */}
              <div className="relative text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Abdul Malik{" "}
                  <span className="text-gradient-subtle">Gamil Mohammed</span>
                </h2>
                <p className="mt-2 text-slate-400 text-sm font-medium">
                  EduSync Researcher & Platform Architect
                </p>

                {/* Divider */}
                <div className="mt-5 flex justify-center">
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent" />
                </div>

                {/* Mini stats */}
                <div className="mt-5 flex gap-6 justify-center text-center">
                  <div>
                    <p className="text-teal-400 font-extrabold text-xl">4+</p>
                    <p className="text-slate-500 text-xs mt-0.5">Research Areas</p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <p className="text-teal-400 font-extrabold text-xl">60</p>
                    <p className="text-slate-500 text-xs mt-0.5">Min Session</p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <p className="text-teal-400 font-extrabold text-xl">Live</p>
                    <p className="text-slate-500 text-xs mt-0.5">Q&A Included</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Right: Highlights ───────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="md:w-7/12 p-10 md:p-14 flex flex-col justify-center gap-7"
            >
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-2">
                  What Makes This Speaker Different
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Abdul Malik brings real research-backed insights — not generic advice. His work lives at the intersection of education technology and student well-being.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {highlights.map(({ id, title, description }, i) => (
                  <motion.div
                    key={id}
                    id={id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                    className="flex gap-4 group"
                  >
                    <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-teal-400/15 border border-teal-400/30 flex items-center justify-center transition-colors duration-200 group-hover:bg-teal-400/25">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{title}</p>
                      <p className="text-slate-400 text-sm mt-0.5 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
