"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const CERTS = [
  {
    id: "06",
    platform: "CISCO NETWORKING ACADEMY",
    name: "ETHICAL_HACKER",
    displayName: "Ethical Hacker",
    category: "CYBERSECURITY",
    date: "DEC 2025",
    verifyUrl: "#",
  },
  {
    id: "05",
    platform: "CISCO NETWORKING ACADEMY",
    name: "INTRODUCTION_TO_DATA_SCIENCE",
    displayName: "Introduction to Data Science",
    category: "DATA SCIENCE",
    date: "DEC 2025",
    verifyUrl: "#",
  },
  {
    id: "04",
    platform: "CISCO NETWORKING ACADEMY",
    name: "INTRODUCTION_TO_CYBERSECURITY",
    displayName: "Introduction to Cybersecurity",
    category: "CYBERSECURITY",
    date: "DEC 2025",
    verifyUrl: "#",
  },
  {
    id: "03",
    platform: "CISCO NETWORKING ACADEMY",
    name: "INTRODUCTION_TO_MODERN_AI",
    displayName: "Introduction to Modern AI",
    category: "ARTIFICIAL INTELLIGENCE",
    date: "DEC 2025",
    verifyUrl: "#",
  },
  {
    id: "02",
    platform: "ALISON",
    name: "E_LEARNING_THEORY_AND_PRACTICE",
    displayName: "E-Learning Theory and Practice",
    category: "EDUCATION TECHNOLOGY",
    date: "OCT 2025",
    verifyUrl: "#",
  },
  {
    id: "01",
    platform: "GOOGLE",
    name: "FUNDAMENTALS_OF_DIGITAL_MARKETING",
    displayName: "Fundamentals of Digital Marketing",
    category: "DIGITAL MARKETING",
    date: "OCT 2025",
    verifyUrl: "#",
  },
];

const TICKER = "CERT_VAULT — ALL SYSTEMS NOMINAL ——> ";

const PLATFORM_COLORS: Record<string, string> = {
  "CISCO NETWORKING ACADEMY": "#049fd9",
  "ALISON": "#2ecc71",
  "GOOGLE": "#4285f4",
};

export function Certification() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      id="certification"
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
            "radial-gradient(ellipse 50% 60% at 15% 50%, rgba(53,105,226,0.045) 0%, transparent 70%)",
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
        {/* ── Section header ── */}
        <motion.div
          className="mb-12"
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
              Certification
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
            Cert Vault.
          </h2>
        </motion.div>

        {/* ── Terminal panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          viewport={{ once: false, amount: 0.2 }}
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "10px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.015)",
          }}
        >
          {/* Terminal header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.75rem 1.25rem",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "1.8rem",
                  height: "1.8rem",
                  borderRadius: "5px",
                  background: "var(--color-brand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                  <rect x="1" y="1" width="4" height="4" rx="0.5" fill="white" />
                  <rect x="6" y="1" width="4" height="4" rx="0.5" fill="white" opacity="0.6" />
                  <rect x="1" y="6" width="4" height="4" rx="0.5" fill="white" opacity="0.6" />
                  <rect x="6" y="6" width="4" height="4" rx="0.5" fill="white" opacity="0.3" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.75)",
                  textTransform: "uppercase",
                }}
              >
                SW :: CERT_VAULT
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                }}
              >
                SYSTEM LIVE
              </span>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 6px rgba(34,197,94,0.7)",
                  display: "inline-block",
                }}
              />
            </div>
          </div>

          {/* Dotted separator */}
          <div style={{ padding: "0.5rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div
              style={{
                height: "1px",
                backgroundImage:
                  "repeating-linear-gradient(to right, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 4px, transparent 4px, transparent 10px)",
              }}
            />
          </div>

          {/* Cert rows */}
          <div>
            {CERTS.map((cert, i) => {
              const isActive = activeId === cert.id;
              const platformColor = PLATFORM_COLORS[cert.platform] ?? "var(--color-brand)";

              return (
                <div key={cert.id}>
                  {/* Row */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                    viewport={{ once: false, amount: 0.2 }}
                    onClick={() => setActiveId(isActive ? null : cert.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.8rem 1rem",
                      borderBottom: isActive ? "none" : "1px solid rgba(255,255,255,0.04)",
                      background: isActive
                        ? "rgba(53,105,226,0.07)"
                        : "transparent",
                      cursor: "pointer",
                      transition: "background 0.3s ease",
                    }}
                  >
                    {/* Status dots */}
                    <span
                      style={{
                        width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0,
                        background: isActive ? "#22c55e" : "rgba(34,197,94,0.35)",
                        boxShadow: isActive ? "0 0 6px rgba(34,197,94,0.6)" : "none",
                        transition: "background 0.3s ease, box-shadow 0.3s ease",
                      }}
                    />
                    <span
                      style={{
                        width: "5px", height: "5px", borderRadius: "50%", flexShrink: 0,
                        background: isActive ? platformColor : "rgba(255,255,255,0.15)",
                        transition: "background 0.3s ease",
                      }}
                    />

                    {/* Slot number */}
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        color: isActive ? "var(--color-brand)" : "rgba(255,255,255,0.3)",
                        flexShrink: 0,
                        width: "3.2rem",
                        transition: "color 0.3s ease",
                      }}
                    >
                      SLOT_{cert.id}
                    </span>

                    {/* Platform :: Name */}
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.08em",
                        flex: 1,
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      <span style={{ color: isActive ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.22)" }}>
                        {cert.platform}
                      </span>
                      <span style={{ color: "rgba(53,105,226,0.7)", margin: "0 0.2rem" }}>::</span>
                      {cert.name}
                    </span>

                    {/* Status / Reading indicator */}
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.52rem",
                        letterSpacing: "0.12em",
                        flexShrink: 0,
                        color: isActive ? "#22c55e" : "rgba(255,255,255,0.2)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {isActive ? "READING..." : "VERIFIED"}
                    </span>
                  </motion.div>

                  {/* Expanded detail panel */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key="expand"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          overflow: "hidden",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                          background: "rgba(255,255,255,0.02)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "2rem",
                            padding: "1.5rem 1.25rem",
                            alignItems: "center",
                          }}
                        >
                          {/* Cert thumbnail placeholder */}
                          <div
                            style={{
                              width: "clamp(7rem, 12vw, 10rem)",
                              aspectRatio: "4/3",
                              flexShrink: 0,
                              borderRadius: "6px",
                              border: "1px solid rgba(255,255,255,0.08)",
                              background: "rgba(255,255,255,0.03)",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.4rem",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.48rem",
                                letterSpacing: "0.15em",
                                color: platformColor,
                                textTransform: "uppercase",
                                opacity: 0.7,
                              }}
                            >
                              {cert.platform.split(" ")[0]}
                            </span>
                            <div
                              style={{
                                width: "2rem",
                                height: "2px",
                                background: platformColor,
                                opacity: 0.4,
                              }}
                            />
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.42rem",
                                color: "rgba(255,255,255,0.2)",
                                textAlign: "center",
                                padding: "0 0.5rem",
                              }}
                            >
                              {cert.date}
                            </span>
                          </div>

                          {/* Cert info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                marginBottom: "0.75rem",
                              }}
                            >
                              <span style={{ color: "var(--color-brand)", fontSize: "0.7rem" }}>›_</span>
                              <span
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "0.55rem",
                                  letterSpacing: "0.15em",
                                  color: "var(--color-brand)",
                                  textTransform: "uppercase",
                                }}
                              >
                                VERIFIED_CREDENTIAL_METADATA
                              </span>
                            </div>

                            <p
                              className="font-extrabold text-white mb-4"
                              style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                                letterSpacing: "-0.02em",
                                lineHeight: 1.2,
                                textTransform: "uppercase",
                              }}
                            >
                              {cert.displayName}
                            </p>

                            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                              {/* Verify button */}
                              <a
                                href={cert.verifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => cert.verifyUrl === "#" && e.preventDefault()}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  padding: "0.5rem 1.1rem",
                                  background: "var(--color-brand)",
                                  borderRadius: "4px",
                                  textDecoration: "none",
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "0.58rem",
                                  letterSpacing: "0.15em",
                                  color: "#ffffff",
                                  textTransform: "uppercase",
                                  flexShrink: 0,
                                }}
                              >
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                                  <path d="M1.5 9.5l8-8M5.5 1.5H9.5V5.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                PUSH_TO_VERIFY
                              </a>

                              {/* Category */}
                              <div>
                                <span
                                  style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.48rem",
                                    letterSpacing: "0.15em",
                                    color: "rgba(255,255,255,0.25)",
                                    textTransform: "uppercase",
                                    display: "block",
                                    marginBottom: "0.2rem",
                                  }}
                                >
                                  CATEGORY
                                </span>
                                <span
                                  style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.62rem",
                                    letterSpacing: "0.1em",
                                    color: "rgba(255,255,255,0.7)",
                                    textTransform: "uppercase",
                                    fontWeight: 600,
                                  }}
                                >
                                  {cert.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Scrolling status bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.04)",
              padding: "0.45rem 0",
              overflow: "hidden",
              background: "rgba(255,255,255,0.01)",
            }}
          >
            <div className="animate-marquee" style={{ animationDuration: "18s" }}>
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.18)",
                    paddingRight: "2rem",
                    whiteSpace: "nowrap",
                    textTransform: "uppercase",
                  }}
                >
                  {"› " + TICKER}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
