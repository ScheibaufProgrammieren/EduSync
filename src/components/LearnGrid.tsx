"use client";

import { motion, type Variants } from "framer-motion";
import { useRef } from "react";

const topics = [
  {
    id: "topic-workload",
    number: "01",
    title: "Managing Your Study Workload",
    subtitle: "Across Every Platform",
    description:
      "Stop drowning in tabs and notifications. Discover the exact system to track assignments, deadlines, and coursework — all from one place — without burning out.",
    tag: "Productivity",
    accent: "#2dd4bf",
  },
  {
    id: "topic-strategies",
    number: "02",
    title: "Core Time Management Strategies",
    subtitle: "Apply Them Right Away",
    description:
      "From time-blocking to the Eisenhower Matrix — we break down the frameworks that top students use and show you how to implement them before the session ends.",
    tag: "Strategy",
    accent: "#818cf8",
  },
  {
    id: "topic-tools",
    number: "03",
    title: "Practical Tools to Stay on Track",
    subtitle: "LMS, MOOCs & Beyond",
    description:
      "Navigate the landscape of productivity tech: which tools actually help, how to connect your LMS and MOOC platforms, and what EduSync is building to solve this permanently.",
    tag: "Tools & Tech",
    accent: "#f472b6",
  },
  {
    id: "topic-qa",
    number: "04",
    title: "Live Open Q&A Session",
    subtitle: "Your Questions, Answered Live",
    description:
      "Bring your toughest scheduling problems and academic overwhelm scenarios. Get direct, honest, research-backed answers from our speaker in real time.",
    tag: "Interactive",
    accent: "#fb923c",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function LearnGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="learn" className="relative py-32 px-4 overflow-hidden bg-transparent">

      {/* ── Section divider line ─────────────────────────────────── */}
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-teal-400/30 to-transparent" />

      <div className="max-w-6xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-teal-400/40" />
            <span className="text-teal-400 text-xs font-bold tracking-[0.25em] uppercase">
              What You&apos;ll Learn
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-teal-400/40" />
          </div>
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight">
              Four Pillars That
              <br />
              <span className="text-gradient-subtle">Change Everything.</span>
            </h2>
            <p className="mt-5 text-slate-400 text-lg max-w-xl leading-relaxed">
              In 60 minutes, we cover the exact areas that separate struggling students from thriving ones.
            </p>
          </div>
        </motion.div>

        {/* ── Cards ───────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
        >
          {topics.map(({ id, number, title, subtitle, description, tag, accent }) => (
            <motion.div
              key={id}
              id={id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="group relative glass-card rounded-3xl p-8 overflow-hidden cursor-default flex flex-col gap-6"
            >
              {/* Hover background wash */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(ellipse at 0% 0%, ${accent}12 0%, transparent 65%)`,
                }}
              />

              {/* ── Top row: number + tag ────────── */}
              <div className="relative flex items-start justify-between gap-4">
                {/* Giant decorative number */}
                <span
                  className="text-[5rem] leading-none font-black tracking-tighter select-none"
                  style={{
                    WebkitTextStroke: `1.5px ${accent}50`,
                    color: "transparent",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {number}
                </span>

                {/* Tag pill */}
                <span
                  className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border"
                  style={{
                    color: accent,
                    borderColor: `${accent}30`,
                    background: `${accent}10`,
                  }}
                >
                  {tag}
                </span>
              </div>

              {/* ── Text block ──────────────────── */}
              <div className="relative flex flex-col gap-2 flex-1">
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: accent }}
                >
                  {subtitle}
                </p>
                <h3 className="text-xl font-extrabold text-white leading-snug">
                  {title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mt-1">
                  {description}
                </p>
              </div>

              {/* ── Bottom accent bar ────────────── */}
              <div
                className="relative h-px w-full rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
