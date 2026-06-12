"use client";

import { useState } from "react";
import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;
const EMAIL = "sithikaweerasinghe2005@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/sithika-weerasinghe" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sithika-weerasinghe" },
  { label: "Instagram", href: "https://instagram.com/sithika.weerasinghe" },
];

// Subtle floating background dots — restrained ambient detail.
const DOTS = [
  { top: "12%", left: "8%" }, { top: "28%", left: "18%" }, { top: "55%", left: "5%" },
  { top: "75%", left: "14%" }, { top: "18%", left: "88%" }, { top: "42%", left: "94%" },
  { top: "68%", left: "85%" }, { top: "82%", left: "92%" }, { top: "8%", left: "52%" },
  { top: "88%", left: "45%" }, { top: "35%", left: "3%" }, { top: "60%", left: "96%" },
];

export function Contact() {
  const [emailHover, setEmailHover] = useState(false);

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t"
      style={{
        background: "#020202",
        borderColor: "rgba(255,255,255,0.04)",
        minHeight: "72vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 6rem)",
      }}
    >
      {/* Floating dots */}
      {DOTS.map((d, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: d.top,
            left: d.left,
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Blue glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(53,105,226,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative text-center" style={{ maxWidth: "880px", width: "100%" }}>
        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-7"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <span className="w-5 h-px" style={{ background: "var(--color-brand)" }} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Let&apos;s Connect
          </span>
          <span className="w-5 h-px" style={{ background: "var(--color-brand)" }} />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
          viewport={{ once: false, amount: 0.5 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.6rem, 6.5vw, 5.4rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.04,
            color: "rgba(255,255,255,0.94)",
            marginBottom: "1.6rem",
          }}
        >
          Let&apos;s build something
          <br />
          <span style={{ color: "var(--color-brand)" }}>that lasts.</span>
        </motion.h2>

        {/* Supporting message */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
          viewport={{ once: false, amount: 0.5 }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1rem, 1.25vw, 1.15rem)",
            lineHeight: 1.7,
            letterSpacing: "-0.005em",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "46ch",
            margin: "0 auto",
          }}
        >
          I&apos;m a creative technologist and Computer Science undergraduate —
          open to internships, freelance projects, and meaningful collaborations.
          If you&apos;re building something worthwhile, I&apos;d love to be part of it.
        </motion.p>

        {/* CTA + email */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          viewport={{ once: false, amount: 0.5 }}
          style={{ marginTop: "2.6rem" }}
        >
          {/* Primary CTA */}
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2.5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#ffffff",
              textDecoration: "none",
              padding: "0.95rem 1.9rem",
              borderRadius: "9999px",
              background: "var(--color-brand)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 16px 40px -12px rgba(53,105,226,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Start a Conversation
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M3 9L9 3M9 3H4M9 3V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Email as the strong direct anchor */}
          <a
            href={`mailto:${EMAIL}`}
            onMouseEnter={() => setEmailHover(true)}
            onMouseLeave={() => setEmailHover(false)}
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
              letterSpacing: "0.01em",
              color: emailHover ? "var(--color-brand)" : "rgba(255,255,255,0.55)",
              textDecoration: "none",
              borderBottom: emailHover
                ? "1px solid var(--color-brand)"
                : "1px solid rgba(255,255,255,0.12)",
              paddingBottom: "0.2rem",
              transition: "color 0.3s ease, border-color 0.3s ease",
            }}
          >
            {EMAIL}
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mx-auto mt-16 mb-9"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          viewport={{ once: false, amount: 0.5 }}
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.09), transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: false, amount: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Social links */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  padding: "0.45rem 1.1rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "9999px",
                  transition:
                    "color 0.25s ease, border-color 0.25s ease, background 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "rgba(53,105,226,0.5)";
                  e.currentTarget.style.background = "rgba(53,105,226,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {label}
              </a>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.3)",
              fontWeight: 300,
              marginTop: "0.4rem",
            }}
          >
            Designed &amp; built by Sithika Weerasinghe
          </p>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.14)",
              textTransform: "uppercase",
            }}
          >
            © 2026 Sithika Weerasinghe — All rights reserved
          </p>
        </motion.div>
      </div>
    </section>
  );
}
