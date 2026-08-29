import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function MaskedLine({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function SectionHead({
  chapter,
  eyebrow,
  title,
  lead,
  align = "left",
  dark = false,
}: {
  chapter: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}>
      <Reveal>
        <p
          className={`font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          } ${dark ? "text-azure-100/80" : "text-azure-600"}`}
        >
          <span className={dark ? "text-white/40" : "text-navy-950/40"}>{chapter}</span>
          <span className={`h-px w-8 ${dark ? "bg-white/30" : "bg-azure-600/40"}`} />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.08] ${
            dark ? "text-white" : "text-navy-950"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-base sm:text-lg leading-relaxed ${dark ? "text-white/65" : "text-bodyink"}`}>
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
