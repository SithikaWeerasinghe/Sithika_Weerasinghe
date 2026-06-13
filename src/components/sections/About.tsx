"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

// Resume file. Drop the CV at `public/resume.pdf` (replace that file to update).
const RESUME_URL = "/resume.pdf";

const POVS = [
  {
    id: "everyone",
    label: "Everyone",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14" aria-hidden="true">
        <circle cx="10" cy="7" r="3.5" />
        <path d="M2.5 17c0-3.314 3.358-6 7.5-6s7.5 2.686 7.5 6" strokeLinecap="round" />
      </svg>
    ),
    quote:
      "I'm a Computer Science undergrad who's been wired to tech since day one. I build things that live at the edge of logic and creativity — clean, purposeful, and designed to leave an impression.",
  },
  {
    id: "recruiters",
    label: "Recruiters",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14" aria-hidden="true">
        <rect x="2" y="7" width="16" height="11" rx="1.5" />
        <path d="M6.5 7V5.5a3.5 3.5 0 017 0V7" strokeLinecap="round" />
      </svg>
    ),
    quote:
      "I thrive on turning concepts into reality — from pure imagination straight through to live implementation. I pick up new tools and frameworks fast. Point me at something worth building and I'll find a way.",
  },
  {
    id: "developers",
    label: "Developers",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14" aria-hidden="true">
        <path d="M7 6L3 10l4 4M13 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    quote:
      "Clean, readable code is non-negotiable for me — proper formatting, sensible structure, code that still makes sense six months later. Always down for a collab or a good challenge. Hit me up.",
  },
];

// Hover-intent delay (ms) before a hovered POV button activates — long enough
// that a quick cursor pass-through doesn't switch, short enough to feel live.
const HOVER_DELAY = 110;

/** One POV selector button. Brighter text + a faint underline on hover so
 *  inactive options feel interactive before they activate. */
function POVButton({
  pov,
  isActive,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: {
  pov: (typeof POVS)[number];
  isActive: boolean;
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => {
        setHover(true);
        onHoverStart();
      }}
      onMouseLeave={() => {
        setHover(false);
        onHoverEnd();
      }}
      // Keyboard users: mirror the hover visual on focus, but never auto-switch
      // on focus — activation stays on Enter/Space (click) for predictability.
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="flex items-center gap-2 pb-2.5 transition-all duration-200"
      style={{
        borderBottom: isActive
          ? "1.5px solid var(--color-brand)"
          : hover
          ? "1.5px solid rgba(255,255,255,0.2)"
          : "1.5px solid transparent",
        color: isActive
          ? "rgba(255,255,255,0.95)"
          : hover
          ? "rgba(255,255,255,0.8)"
          : "rgba(255,255,255,0.55)",
        cursor: "pointer",
      }}
    >
      <span
        className="flex-shrink-0 transition-colors duration-200"
        style={{
          color: isActive
            ? "var(--color-brand)"
            : hover
            ? "rgba(255,255,255,0.7)"
            : "rgba(255,255,255,0.45)",
        }}
      >
        {pov.icon}
      </span>
      <span
        className="text-sm font-medium transition-colors duration-200"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {pov.label}
      </span>
    </button>
  );
}

export function About() {
  const [active, setActive] = useState(0);
  const [resumeHover, setResumeHover] = useState(false);
  const pov = POVS[active];

  // Hover-intent timer so a quick cursor pass-through doesn't switch tabs.
  const hoverTimer = useRef<number | null>(null);
  const clearHoverTimer = () => {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };
  useEffect(() => clearHoverTimer, []);

  // Click (and keyboard Enter/Space) — immediate, cancels any pending hover.
  const select = (i: number) => {
    clearHoverTimer();
    setActive(i);
  };

  // Hover-to-activate, gated to real hover + fine-pointer devices so touch
  // tablets/phones keep tap-to-select. The short delay debounces fly-overs.
  const onHoverStart = (i: number) => {
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    clearHoverTimer();
    hoverTimer.current = window.setTimeout(() => setActive(i), HOVER_DELAY);
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t"
      style={{
        background: "#020202",
        borderColor: "rgba(255,255,255,0.04)",
        minHeight: "88vh",
      }}
    >

{/* Ambient blue glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 12% 60%, rgba(53,105,226,0.055) 0%, transparent 70%)",
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] min-h-[88vh]">

        {/* ── Left: heading + horizontal tabs ── */}
        <motion.div
          className="relative flex flex-col justify-center py-24 lg:py-0"
          style={{
            paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
            paddingRight: "clamp(1.5rem, 3vw, 3.5rem)",
            borderRight: "1px solid rgba(255,255,255,0.05)",
          }}
          initial={{ opacity: 0, x: -35, y: 10 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
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
              REAL ME
            </span>
          </div>

          {/* Main heading */}
          <h2
            className="font-extrabold text-white leading-none mb-8"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 8vw, 7.5rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Real<br />Me.
          </h2>

          {/* Choose your POV label — more visible */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px" style={{ background: "rgba(255,255,255,0.2)" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.24em",
                color: "rgba(255,255,255,0.55)",
                textTransform: "uppercase",
              }}
            >
              CHOOSE YOUR POV
            </span>
          </div>

          {/* Horizontal tabs */}
          <div className="flex items-center gap-7">
            {POVS.map((p, i) => (
              <POVButton
                key={p.id}
                pov={p}
                isActive={active === i}
                onSelect={() => select(i)}
                onHoverStart={() => onHoverStart(i)}
                onHoverEnd={clearHoverTimer}
              />
            ))}
          </div>

          {/* View Full Resume — sits under the POV selector, aligned with this
              left column. Opens the CV in a new tab. */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setResumeHover(true)}
            onMouseLeave={() => setResumeHover(false)}
            style={{
              alignSelf: "flex-start",
              marginTop: "clamp(2rem, 4.5vh, 3rem)",
              display: "inline-flex",
              alignItems: "center",
              gap: "1rem",
              paddingTop: "0.55rem",
              paddingBottom: "0.55rem",
              paddingLeft: "1.6rem",
              paddingRight: "0.55rem",
              borderRadius: "9999px",
              background: resumeHover ? "#111827" : "#0d0f18",
              textDecoration: "none",
              boxShadow: resumeHover
                ? "0 8px 32px rgba(53,105,226,0.18), inset 0 0 0 1px rgba(53,105,226,0.2)"
                : "inset 0 0 0 1px rgba(255,255,255,0.06)",
              transform: resumeHover ? "translateY(-2px)" : "translateY(0)",
              transition:
                "background 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.86rem, 1.3vw, 0.96rem)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: resumeHover ? "#ffffff" : "rgba(255,255,255,0.82)",
                transition: "color 0.35s ease",
              }}
            >
              View Full Resume
            </span>
            <span
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "9999px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: resumeHover
                  ? "rgba(53,105,226,0.22)"
                  : "rgba(255,255,255,0.07)",
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
                  transform: resumeHover
                    ? "translate(1px, -1px)"
                    : "translate(0,0)",
                  transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <path
                  d="M2 11L11 2M7 2h4v4"
                  stroke={
                    resumeHover ? "var(--color-brand)" : "rgba(255,255,255,0.65)"
                  }
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>

        </motion.div>

        {/* ── Right: quote ── */}
        <motion.div
          className="relative flex flex-col justify-center py-24 lg:py-0"
          style={{
            paddingLeft: "clamp(2.5rem, 6vw, 7rem)",
            paddingRight: "clamp(1.5rem, 5vw, 6rem)",
          }}
          initial={{ opacity: 0, x: 35, y: 10 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <blockquote key={pov.id} className="animate-fade-in">
            <span
              className="block font-extrabold leading-none mb-1 select-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(5rem, 9vw, 8rem)",
                color: "var(--color-brand)",
                opacity: 0.55,
                lineHeight: 0.85,
              }}
              aria-hidden="true"
            >
              "
            </span>

            <p
              className="font-extrabold text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.7rem, 3vw, 2.7rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.18,
              }}
            >
              {pov.quote}
            </p>

            <div
              className="mt-10 h-px"
              style={{
                width: "4rem",
                background: "linear-gradient(to right, var(--color-brand), transparent)",
              }}
            />
          </blockquote>
        </motion.div>

      </div>
    </section>
  );
}
