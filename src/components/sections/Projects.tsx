"use client";

import { useState } from "react";
import { motion } from "motion/react";

const PROJECTS = [
  {
    id: "01",
    name: "TrackVision",
    category: "Computer Vision",
    tech: ["Python", "YOLOv8", "OpenCV", "Raspberry Pi"],
    year: "2024",
    href: "#",
    description: "Real-time pedestrian & vehicle detection system. Runs on Raspberry Pi with 94% accuracy across 6 object classes.",
  },
  {
    id: "02",
    name: "DevBoard",
    category: "Web Development",
    tech: ["Next.js", "TypeScript", "Tailwind", "Node.js"],
    year: "2025",
    href: "#",
    description: "Collaborative task management app for dev teams. Drag-and-drop kanban, real-time updates, and GitHub integration.",
  },
  {
    id: "03",
    name: "AgroNode",
    category: "Embedded Systems",
    tech: ["ESP32", "C/C++", "Python", "MQTT"],
    year: "2024",
    href: "#",
    description: "IoT crop health monitoring network. Tracks soil moisture, temperature, and humidity — streams live data to a web dashboard.",
  },
  {
    id: "04",
    name: "NeuralLens",
    category: "Machine Learning",
    tech: ["PyTorch", "OpenCV", "Python"],
    year: "2023",
    href: "#",
    description: "Custom CNN image classification pipeline. Trained on 12k images with data augmentation — 91% validation accuracy.",
  },
];

export function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t"
      style={{
        background: "#020202",
        borderColor: "rgba(255,255,255,0.04)",
      }}
    >
      {/* Ambient glow — right side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 90% 35%, rgba(53,105,226,0.05) 0%, transparent 70%)",
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
        {/* ── Section Header ── */}
        <motion.div
          className="flex items-end justify-between mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div>
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
                Selected Work
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
              Projects.
            </h2>
          </div>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.15)",
              textTransform: "uppercase",
              paddingBottom: "0.4rem",
            }}
          >
            {String(PROJECTS.length).padStart(2, "0")} Projects
          </span>
        </motion.div>

        {/* ── Top divider ── */}
        <div
          className="w-full h-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />

        {/* ── Project Rows ── */}
        <div>
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.07,
              }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <a
                href={project.href}
                onClick={(e) => e.preventDefault()}
                className="relative flex items-center py-7 lg:py-9"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {/* Hover bg + left border */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: hovered === i ? 1 : 0,
                    background:
                      "linear-gradient(to right, rgba(53,105,226,0.06) 0%, transparent 55%)",
                    borderLeft: `2px solid ${hovered === i ? "var(--color-brand)" : "transparent"}`,
                    transition:
                      "opacity 0.45s cubic-bezier(0.22,1,0.36,1), border-color 0.45s",
                    pointerEvents: "none",
                  }}
                />

                {/* Number */}
                <span
                  className="relative flex-shrink-0"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.15em",
                    width: "3.5rem",
                    color:
                      hovered === i
                        ? "var(--color-brand)"
                        : "rgba(255,255,255,0.2)",
                    transition: "color 0.35s ease",
                  }}
                >
                  {project.id}
                </span>

                {/* Project name + description */}
                <span
                  className="relative flex-1 flex flex-col"
                  style={{
                    transform:
                      hovered === i ? "translateX(10px)" : "translateX(0)",
                    transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <span
                    className="font-extrabold"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.5rem, 3.2vw, 2.8rem)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                      color:
                        hovered === i ? "#ffffff" : "rgba(255,255,255,0.72)",
                      transition: "color 0.4s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {project.name}
                  </span>
                  <span
                    className="hidden lg:block mt-1.5"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.35)",
                      lineHeight: 1.5,
                      maxWidth: "38ch",
                      opacity: hovered === i ? 1 : 0,
                      transform: hovered === i ? "translateY(0)" : "translateY(4px)",
                      transition:
                        "opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {project.description}
                  </span>
                </span>

                {/* Tech tags — visible only on hover, desktop only */}
                <div
                  className="hidden lg:flex items-center gap-2 mr-10"
                  style={{
                    opacity: hovered === i ? 1 : 0,
                    transition: "opacity 0.35s ease",
                    flexShrink: 0,
                  }}
                >
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.52rem",
                        letterSpacing: "0.12em",
                        color: "rgba(255,255,255,0.35)",
                        padding: "3px 7px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "2px",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Category */}
                <span
                  className="hidden md:block flex-shrink-0"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    width: "10rem",
                    textAlign: "right",
                    color:
                      hovered === i
                        ? "rgba(255,255,255,0.4)"
                        : "rgba(255,255,255,0.18)",
                    transition: "color 0.35s ease",
                  }}
                >
                  {project.category}
                </span>

                {/* Year */}
                <span
                  className="hidden lg:block flex-shrink-0 ml-8"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    width: "3.5rem",
                    textAlign: "right",
                    color: "rgba(255,255,255,0.18)",
                  }}
                >
                  {project.year}
                </span>

                {/* Arrow */}
                <span
                  className="ml-6 flex-shrink-0"
                  style={{
                    color:
                      hovered === i
                        ? "var(--color-brand)"
                        : "rgba(255,255,255,0.12)",
                    transform:
                      hovered === i ? "translateX(4px)" : "translateX(0)",
                    transition:
                      "color 0.35s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.5 9h11M9.5 4l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* ── Footer rule ── */}
        <motion.div
          className="mt-14 flex items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.25 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to right, var(--color-brand), rgba(53,105,226,0.15), transparent)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.15)",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            More coming soon
          </span>
        </motion.div>
      </div>
    </section>
  );
}
