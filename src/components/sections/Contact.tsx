"use client";

import { useState } from "react";
import { motion } from "motion/react";

const DOTS = [
  { top: "12%", left: "8%" }, { top: "28%", left: "18%" }, { top: "55%", left: "5%" },
  { top: "75%", left: "14%" }, { top: "18%", left: "88%" }, { top: "42%", left: "94%" },
  { top: "68%", left: "85%" }, { top: "82%", left: "92%" }, { top: "8%",  left: "52%" },
  { top: "88%", left: "45%" }, { top: "35%", left: "3%"  }, { top: "60%", left: "96%" },
];

export function Contact() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t"
      style={{
        background: "#020202",
        borderColor: "rgba(255,255,255,0.04)",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 6rem)",
      }}
    >
      {/* Subtle floating dots */}
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
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(53,105,226,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative text-center" style={{ maxWidth: "900px", width: "100%" }}>
        {/* Eyebrow */}
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.5 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "rgba(255,255,255,0.92)",
            marginBottom: "1.8rem",
          }}
        >
          Have a project in mind?
        </motion.h2>

        {/* Email */}
        <motion.a
          href="mailto:sithikaweerasinghe2005@gmail.com"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          viewport={{ once: false, amount: 0.5 }}
          style={{
            display: "block",
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.9rem, 2vw, 1.3rem)",
            fontWeight: 400,
            letterSpacing: "0.01em",
            color: hovered ? "var(--color-brand)" : "rgba(255,255,255,0.4)",
            textDecoration: "none",
            transition: "color 0.35s ease",
          }}
        >
          sithikaweerasinghe2005@gmail.com
        </motion.a>

        {/* Divider */}
        <motion.div
          className="mx-auto mt-14 mb-10"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          viewport={{ once: false, amount: 0.5 }}
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
            transformOrigin: "center",
          }}
        />

        {/* Footer line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.35 }}
          viewport={{ once: false, amount: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.28)",
              fontWeight: 300,
            }}
          >
            Design &amp; built by Sithika Weerasinghe
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {[
              { label: "GitHub", href: "https://github.com/sithika-weerasinghe" },
              { label: "LinkedIn", href: "https://linkedin.com/in/sithika-weerasinghe" },
              { label: "Instagram", href: "https://instagram.com/sithika.weerasinghe" },
            ].map(({ label, href }) => (
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
                  padding: "0.4rem 1rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "9999px",
                  transition: "color 0.25s ease, border-color 0.25s ease, background 0.25s ease",
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
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.12)",
              textTransform: "uppercase",
              marginTop: "0.5rem",
            }}
          >
            © 2026 Sithika Weerasinghe — All rights reserved
          </p>
        </motion.div>
      </div>
    </section>
  );
}
