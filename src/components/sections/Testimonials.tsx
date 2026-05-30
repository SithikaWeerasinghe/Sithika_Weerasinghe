"use client";

import { useState } from "react";
import { motion } from "motion/react";

const REVIEWS = [
  {
    id: 1,
    quote:
      "Sithika delivered exactly what we needed — clean code, fast turnaround, and great communication throughout. He understood the brief immediately and didn't need hand-holding.",
    name: "Client Name",
    role: "CEO",
    company: "Company One",
    work: "Full Stack Development",
    initial: "C",
  },
  {
    id: 2,
    quote:
      "Working with Sithika was seamless. He brought ideas to the table we hadn't even thought of and the final product was better than what we originally scoped.",
    name: "Client Name",
    role: "Founder",
    company: "Company Two",
    work: "Web Development",
    initial: "C",
  },
  {
    id: 3,
    quote:
      "Reliable, skilled, and genuinely invested in the outcome. Sithika is the kind of developer you want on your side when things need to actually get done.",
    name: "Client Name",
    role: "Product Manager",
    company: "Company Three",
    work: "Frontend Development",
    initial: "C",
  },
];

export function Testimonials() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-t"
      style={{
        background: "#020202",
        borderColor: "rgba(255,255,255,0.04)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(53,105,226,0.045) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
          paddingTop: "clamp(5rem, 10vw, 9rem)",
          paddingBottom: "clamp(5rem, 10vw, 9rem)",
        }}
      >
        {/* ── Header ── */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-5 h-px" style={{ background: "var(--color-brand)" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
              }}
            >
              Kind Words
            </span>
          </div>
          <h2
            className="font-extrabold text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            What They Say.
          </h2>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.95,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.1,
              }}
              viewport={{ once: false, amount: 0.2 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "clamp(1.5rem, 3vw, 2.2rem)",
                borderRadius: "12px",
                background:
                  hovered === i
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.02)",
                border: `1px solid ${
                  hovered === i
                    ? "rgba(53,105,226,0.2)"
                    : "rgba(255,255,255,0.06)"
                }`,
                transition:
                  "background 0.4s ease, border-color 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease",
                transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
                boxShadow:
                  hovered === i
                    ? "0 16px 48px rgba(53,105,226,0.1)"
                    : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "2rem",
              }}
            >
              {/* Quote mark + text */}
              <div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "3.5rem",
                    lineHeight: 0.8,
                    color: "var(--color-brand)",
                    opacity: 0.4,
                    marginBottom: "1rem",
                    userSelect: "none",
                  }}
                  aria-hidden="true"
                >
                  "
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(0.88rem, 1.3vw, 1rem)",
                    lineHeight: 1.72,
                    color: "rgba(255,255,255,0.65)",
                    fontWeight: 400,
                  }}
                >
                  {r.quote}
                </p>
              </div>

              {/* Person */}
              <div className="flex items-center gap-3">
                {/* Avatar initial */}
                <div
                  style={{
                    width: "2.4rem",
                    height: "2.4rem",
                    borderRadius: "9999px",
                    background: "rgba(53,105,226,0.12)",
                    border: "1px solid rgba(53,105,226,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontFamily: "var(--font-display)",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "var(--color-brand)",
                  }}
                >
                  {r.initial}
                </div>

                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.3,
                    }}
                  >
                    {r.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.3)",
                      textTransform: "uppercase",
                      marginTop: "0.2rem",
                    }}
                  >
                    {r.role} · {r.company}
                  </p>
                </div>

                {/* Work type tag — pushed right */}
                <div style={{ marginLeft: "auto" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.52rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(53,105,226,0.7)",
                      padding: "3px 8px",
                      border: "1px solid rgba(53,105,226,0.18)",
                      borderRadius: "3px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {r.work}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Footer note ── */}
        <motion.p
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: false, amount: 0.5 }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.15)",
            textTransform: "uppercase",
          }}
        >
          Real feedback from real clients — updated as projects complete
        </motion.p>
      </div>
    </section>
  );
}
