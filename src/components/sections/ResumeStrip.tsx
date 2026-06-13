"use client";

import { useState } from "react";
import { motion } from "motion/react";

// Resume file. Drop your CV at `public/resume.pdf` (or point this at any URL).
// To update the résumé later, just replace that file — this link stays the same.
const RESUME_URL = "/resume.pdf";

export function ResumeStrip() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      style={{
        background: "#020202",
        display: "flex",
        justifyContent: "center",
        paddingTop: "clamp(2rem, 4vw, 3rem)",
        paddingBottom: "clamp(2rem, 4vw, 3rem)",
      }}
    >
      <motion.a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: false, amount: 0.5 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "1rem",
          paddingTop: "0.55rem",
          paddingBottom: "0.55rem",
          paddingLeft: "1.6rem",
          paddingRight: "0.55rem",
          borderRadius: "9999px",
          background: hovered ? "#111827" : "#0d0f18",
          textDecoration: "none",
          cursor: "pointer",
          boxShadow: hovered
            ? "0 8px 32px rgba(53,105,226,0.18), inset 0 0 0 1px rgba(53,105,226,0.2)"
            : "inset 0 0 0 1px rgba(255,255,255,0.06)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          transition:
            "background 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Label */}
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.88rem, 1.4vw, 1rem)",
            fontWeight: 500,
            color: hovered ? "#ffffff" : "rgba(255,255,255,0.82)",
            letterSpacing: "-0.01em",
            transition: "color 0.35s ease",
          }}
        >
          View Full Resume
        </span>

        {/* Circle icon */}
        <span
          style={{
            width: "2.1rem",
            height: "2.1rem",
            borderRadius: "9999px",
            background: hovered
              ? "rgba(53,105,226,0.22)"
              : "rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.4s ease",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            aria-hidden="true"
            style={{
              transform: hovered ? "translate(1px, -1px)" : "translate(0,0)",
              transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <path
              d="M2 11L11 2M7 2h4v4"
              stroke={hovered ? "var(--color-brand)" : "rgba(255,255,255,0.65)"}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </motion.a>
    </section>
  );
}
