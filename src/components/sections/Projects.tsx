"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  label: string;
  type: string;
  status: string;
  description: string;
  role: string;
  stack: string[];
  live: string | null;
  github: string | null;
  /**
   * Screenshots for the slider. Drop files in `public/projects/` and list
   * their paths here, e.g. ["/projects/adorix-1.png", "/projects/adorix-2.png"].
   * Leave empty to show the "screenshot coming soon" placeholder frame.
   */
  images: string[];
};

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Adorix",
    label: "AI-Powered Smart Advertising Kiosk",
    type: "AI + Edge Device System · Smart Advertising Platform",
    status: "Team Project · Live",
    description:
      "An AI-powered smart advertising kiosk that combines computer vision, voice interaction, backend intelligence, cloud sync, and a hosted web platform for real physical deployment.",
    role: "Team Project — IoT / device integration, computer vision, voice interaction, backend logic, Supabase sync, documentation, and web authentication / payment / product logic.",
    stack: [
      "Python",
      "FastAPI",
      "React",
      "OpenCV",
      "Supabase",
      "WebSockets",
      "Voice AI",
      "Raspberry Pi / Kiosk",
      "Payment Gateway",
    ],
    live: "https://adorixit.com",
    github: "https://github.com/ADORIX000/Adorix-project",
    images: [
      "/projects/adorix-platform.png", // Slide 1 — Adorix web platform / hero
      "/projects/adorix-team.jpg", // Slide 2 — team with the physical kiosk device
    ],
  },
  {
    id: "02",
    title: "ML Project",
    label: "Details updating soon",
    type: "Machine Learning Project",
    status: "In Progress",
    description:
      "A machine learning project focused on solving a real prediction or classification problem through a structured model pipeline and practical evaluation workflow.",
    role: "Model development / evaluation.",
    stack: [],
    live: null,
    github: null,
    images: [],
  },
  {
    id: "03",
    title: "ApexFled",
    label: "Full-Stack E-Commerce Platform",
    type: "Full-Stack E-Commerce Platform",
    status: "Full-Stack Build · Live",
    description:
      "A production-ready digital products e-commerce platform with variant-based inventory, integrated payments, and automated account delivery.",
    role: "Full-Stack Developer.",
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Mercado Pago",
      "NOWPayments",
    ],
    live: "https://www.apexfled.com",
    github: "https://github.com/SithikaWeerasinghe/digital-account-store",
    images: [
      "/projects/apexfled-home.png", // Slide 1 — homepage / hero
      "/projects/apexfled-dashboard.png", // Slide 2 — admin dashboard
      "/projects/apexfled-checkout.png", // Slide 3 — product detail / checkout
    ],
  },
  {
    id: "04",
    title: "GRAS",
    label: "Restaurant Website for Real Customer Use",
    type: "Restaurant Website · Real Client Web Project",
    status: "Client Project",
    description:
      "A premium restaurant website built as a real client-facing platform for showcasing the brand, menu, and enabling online table reservations.",
    role: "Developer / Major Contributor.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Responsive Web Design",
    ],
    live: null,
    github: "https://github.com/SithikaWeerasinghe/Gras-Restaurant",
    images: [],
  },
  {
    id: "05",
    title: "SceneSeek",
    label: "Computer Vision / ML Prototype",
    type: "Computer Vision · Machine Learning Prototype",
    status: "Solo Project · Prototype",
    description:
      "A computer vision prototype that identifies a movie from a short video clip using deep visual feature extraction and similarity matching.",
    role: "Sole Developer.",
    stack: ["Python", "PyTorch", "TorchVision", "OpenCV", "NumPy", "ResNet18"],
    live: null,
    github: null,
    images: [],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const pad2 = (n: number) => String(n).padStart(2, "0");

// Hover-intent delay (ms) before a hovered tab activates — long enough that a
// quick cursor pass-through doesn't switch projects, short enough to feel live.
const HOVER_DELAY = 110;

/* ─────────────────────────  Shared small pieces  ───────────────────────── */

function StackTags({ stack }: { stack: string[] }) {
  if (stack.length === 0) {
    return (
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
        }}
      >
        Stack updating soon
      </span>
    );
  }
  return (
    <div className="flex flex-wrap gap-2.5">
      {stack.map((t) => (
        <span
          key={t}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.66rem",
            fontWeight: 500,
            letterSpacing: "0.07em",
            color: "rgba(255,255,255,0.66)",
            padding: "5px 11px",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: "6px",
            background: "rgba(255,255,255,0.025)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/**
 * Status pill — keeps every project's status consistent: one neutral chip with
 * a small state dot (green = shipped/live, blue = everything else). The wording
 * itself stays exactly as approved in the project data.
 */
function statusTone(status: string): string {
  return status.toLowerCase().includes("live")
    ? "#22c55e" // shipped / live — matches the live indicator used elsewhere
    : "var(--color-brand)"; // in progress, prototype, client build, etc.
}

function StatusChip({ status }: { status: string }) {
  const tone = statusTone(status);
  return (
    <span
      className="inline-flex items-center gap-2"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.55rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.72)",
        padding: "4px 11px 4px 9px",
        borderRadius: "9999px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.1)",
        whiteSpace: "nowrap",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: tone,
          boxShadow: `0 0 6px ${tone}`,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}

const ArrowGlyph = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M3 9L9 3M9 3H4M9 3V8"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Chevron = ({ to }: { to: "left" | "right" }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={to === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Glass circular button used by both the project nav and the screenshot slider. */
function RoundIconButton({
  onClick,
  disabled,
  label,
  children,
  size = 42,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  children: ReactNode;
  size?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "9999px",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.03)",
        color: disabled ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.7)",
        cursor: disabled ? "not-allowed" : "pointer",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        transition:
          "color 0.25s ease, border-color 0.25s ease, background 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.borderColor = "rgba(53,105,226,0.5)";
        e.currentTarget.style.background = "rgba(53,105,226,0.1)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.color = "rgba(255,255,255,0.7)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </button>
  );
}

function DisabledPill({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.58rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.25)",
        padding: "0.6rem 1.1rem",
        borderRadius: "9999px",
        border: "1px dashed rgba(255,255,255,0.1)",
        cursor: "not-allowed",
      }}
    >
      {label}
    </span>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Live */}
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#ffffff",
            textDecoration: "none",
            padding: "0.6rem 1.1rem",
            borderRadius: "9999px",
            background: "var(--color-brand)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(53,105,226,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Visit Live Site
          <ArrowGlyph />
        </a>
      ) : (
        <DisabledPill label="Live Soon" />
      )}

      {/* GitHub */}
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
            textDecoration: "none",
            padding: "0.6rem 1.1rem",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.12)",
            transition: "color 0.25s ease, border-color 0.25s ease, background 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.borderColor = "rgba(53,105,226,0.5)";
            e.currentTarget.style.background = "rgba(53,105,226,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          View GitHub
          <ArrowGlyph />
        </a>
      ) : (
        <DisabledPill label="Repo Soon" />
      )}
    </div>
  );
}

/* ─────────────────────────  Screenshot slider  ───────────────────────── */

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? "6%" : "-6%", scale: 1.02 }),
  center: { opacity: 1, x: "0%", scale: 1 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? "-6%" : "6%", scale: 1.02 }),
};

function ScreenshotFrame({ project }: { project: Project }) {
  // Each project's slider keeps its own image index + slide direction.
  const [[index, dir], setIndex] = useState<[number, number]>([0, 0]);
  const images = project.images;
  const count = images.length;
  const multiple = count > 1;

  const paginate = (delta: number) => {
    if (!multiple) return;
    setIndex(([i]) => [(i + delta + count) % count, delta]);
  };
  const goTo = (i: number) =>
    setIndex(([cur]) => [i, i > cur ? 1 : -1]);

  const host = project.live
    ? project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${project.title.toLowerCase().replace(/\s+/g, "")}.preview`;

  return (
    <div className="relative">
      {/* Soft cool glow behind the window for cinematic depth */}
      <div
        className="absolute -inset-6 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 38%, rgba(53,105,226,0.1) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      {/* macOS-style window frame */}
      <div
        className="relative"
        style={{
          borderRadius: "14px",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
          overflow: "hidden",
          // Layered depth: hairline ring + inset top highlight + a soft ambient
          // shadow over a tighter contact shadow — premium, not glossy.
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.07), 0 42px 80px -34px rgba(0,0,0,0.8), 0 14px 30px -20px rgba(0,0,0,0.65)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-3"
          style={{
            padding: "0.72rem 1.1rem",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.035), rgba(255,255,255,0.01))",
          }}
        >
          {/* macOS traffic lights — real hues, slightly muted for the dark
              theme, with a soft top highlight so they read as glass, not flat. */}
          <div className="flex items-center" style={{ gap: 8 }}>
            {[
              { base: "#ed5049", hi: "#ff8a84" },
              { base: "#e0a92b", hi: "#ffce5a" },
              { base: "#1fae3a", hi: "#54da66" },
            ].map((c, d) => (
              <span
                key={d}
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 32% 30%, ${c.hi}, ${c.base})`,
                  boxShadow:
                    "inset 0 0.5px 0.5px rgba(255,255,255,0.45), inset 0 -0.5px 1px rgba(0,0,0,0.25), 0 0 0 0.5px rgba(0,0,0,0.22)",
                }}
              />
            ))}
          </div>
          <div className="flex-1 flex justify-center">
            <span
              className="inline-flex items-center"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.42)",
                padding: "0.22rem 0.95rem",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                maxWidth: "72%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {host}
            </span>
          </div>
          {/* Spacer balances the traffic lights so the address stays centered */}
          <div style={{ width: 49 }} />
        </div>

        {/* Image stage */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "16 / 10",
            background: "#050608",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {count > 0 ? (
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={images[index]}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 90vw, 48vw"
                  // Webpage screenshots read best anchored to the top edge.
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <ScreenshotPlaceholder project={project} />
          )}

          {/* Soft top sheen */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0"
            style={{
              height: "26%",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.03), transparent)",
            }}
          />

          {/* Hairline inner glass ring for depth */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}
          />
        </div>
      </div>

      {/* Controls — only when there is more than one screenshot to slide */}
      {multiple && (
        <div
          className="flex items-center justify-between"
          style={{ marginTop: "1.25rem" }}
        >
          {/* Pagination dots */}
          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                style={{
                  width: i === index ? 20 : 6,
                  height: 6,
                  borderRadius: "9999px",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  background:
                    i === index ? "var(--color-brand)" : "rgba(255,255,255,0.2)",
                  boxShadow: i === index ? "0 0 8px rgba(53,105,226,0.45)" : "none",
                  transition:
                    "width 0.35s ease, background 0.35s ease, box-shadow 0.35s ease",
                }}
              />
            ))}
          </div>

          {/* Counter + arrows */}
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {pad2(index + 1)}
              <span style={{ color: "rgba(255,255,255,0.2)" }}>
                {" "}
                / {pad2(count)}
              </span>
            </span>
            <RoundIconButton
              onClick={() => paginate(-1)}
              label="Previous screenshot"
              size={36}
            >
              <Chevron to="left" />
            </RoundIconButton>
            <RoundIconButton
              onClick={() => paginate(1)}
              label="Next screenshot"
              size={36}
            >
              <Chevron to="right" />
            </RoundIconButton>
          </div>
        </div>
      )}
    </div>
  );
}

function ScreenshotPlaceholder({ project }: { project: Project }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 80% 80% at 50% 40%, rgba(53,105,226,0.07) 0%, transparent 65%)",
      }}
    >
      {/* Faint title watermark */}
      <span
        aria-hidden="true"
        className="absolute select-none font-extrabold"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3rem, 8vw, 6rem)",
          letterSpacing: "-0.04em",
          color: "rgba(255,255,255,0.035)",
          whiteSpace: "nowrap",
        }}
      >
        {project.title}
      </span>

      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        style={{ marginBottom: "0.9rem", opacity: 0.5 }}
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="var(--color-brand)"
          strokeWidth="1.3"
        />
        <circle cx="8" cy="10" r="1.6" stroke="var(--color-brand)" strokeWidth="1.3" />
        <path
          d="M3 16l5-4 4 3 3-2 6 5"
          stroke="var(--color-brand)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        Screenshot coming soon
      </span>
    </div>
  );
}

/* ─────────────────────────  Readable info panel  ───────────────────────── */

function ProjectInfo({ project }: { project: Project }) {
  return (
    <div className="flex flex-col">
      {/* Eyebrow label */}
      <span
        className="block mb-4"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-brand)",
        }}
      >
        {project.label}
      </span>

      {/* Title */}
      <h3
        className="font-extrabold text-white"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.4rem, 3.4vw, 3.6rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.02,
          marginBottom: "1rem",
        }}
      >
        {project.title}
      </h3>

      {/* Meta row */}
      <div
        className="flex items-center gap-3 flex-wrap"
        style={{ marginBottom: "1.9rem" }}
      >
        <StatusChip status={project.status} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.34)",
          }}
        >
          {project.type}
        </span>
      </div>

      {/* Description — large, high contrast, fully visible */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(1.06rem, 1.15vw, 1.2rem)",
          lineHeight: 1.7,
          letterSpacing: "-0.011em",
          color: "rgba(255,255,255,0.9)",
          marginBottom: "2rem",
          maxWidth: "52ch",
          textWrap: "pretty",
        }}
      >
        {project.description}
      </p>

      {/* Role */}
      <div className="mb-8">
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: "0.56rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "0.7rem",
          }}
        >
          My Role
        </span>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.92rem",
            lineHeight: 1.65,
            letterSpacing: "-0.005em",
            color: "rgba(255,255,255,0.6)",
            maxWidth: "52ch",
            textWrap: "pretty",
          }}
        >
          {project.role}
        </p>
      </div>

      {/* Stack */}
      <div className="mb-8">
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: "0.56rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
            marginBottom: "0.85rem",
          }}
        >
          Tech Stack
        </span>
        <StackTags stack={project.stack} />
      </div>

      {/* Footer — actions sit below a hairline for clear hierarchy */}
      <div
        style={{
          marginTop: "0.4rem",
          paddingTop: "1.6rem",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <ProjectLinks project={project} />
      </div>
    </div>
  );
}

/* ─────────────────────────  Desktop cinematic showcase  ───────────────────────── */

const panelVariants = {
  enter: (d: number) => ({ opacity: 0, x: d >= 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d >= 0 ? -48 : 48 }),
};

/** Project selector pill. Brighter inactive text + a subtle hover lift so
 *  unselected projects stay readable, not greyed-out. */
function ProjectTab({
  project,
  isActive,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: {
  project: Project;
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
      className="inline-flex items-center gap-2.5"
      style={{
        padding: "0.5rem 0.95rem",
        borderRadius: "9999px",
        border: isActive
          ? "1px solid rgba(53,105,226,0.5)"
          : hover
          ? "1px solid rgba(255,255,255,0.2)"
          : "1px solid rgba(255,255,255,0.1)",
        background: isActive
          ? "rgba(53,105,226,0.1)"
          : hover
          ? "rgba(255,255,255,0.05)"
          : "rgba(255,255,255,0.025)",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.1em",
          color: isActive
            ? "var(--color-brand)"
            : hover
            ? "rgba(255,255,255,0.6)"
            : "rgba(255,255,255,0.42)",
          transition: "color 0.3s ease",
        }}
      >
        {project.id}
      </span>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.82rem",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: isActive
            ? "#ffffff"
            : hover
            ? "rgba(255,255,255,0.85)"
            : "rgba(255,255,255,0.66)",
          transition: "color 0.3s ease",
        }}
      >
        {project.title}
      </span>
    </button>
  );
}

function ProjectsDesktop() {
  const [[active, dir], setActive] = useState<[number, number]>([0, 0]);
  const count = PROJECTS.length;
  const project = PROJECTS[active];

  // Hover-intent timer so quick cursor passes don't trigger noisy switching.
  const hoverTimer = useRef<number | null>(null);
  const clearHoverTimer = () => {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };
  useEffect(() => clearHoverTimer, []);

  // Direction-aware setter. Returns the previous tuple unchanged when the
  // target is already active, so React bails out — no re-render, no flicker.
  const setActiveIndex = (i: number) =>
    setActive((prev) => (prev[0] === i ? prev : [i, i > prev[0] ? 1 : -1]));

  // Click (and keyboard Enter/Space) — immediate, cancels any pending hover.
  const go = (i: number) => {
    clearHoverTimer();
    setActiveIndex(i);
  };
  const paginate = (delta: number) => {
    clearHoverTimer();
    setActive(([cur]) => [(cur + delta + count) % count, delta]);
  };

  // Desktop hover-to-activate, gated to real hover + fine-pointer devices so
  // touch tablets keep tap-to-select. The short delay debounces fly-overs.
  const onTabHoverStart = (i: number) => {
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    clearHoverTimer();
    hoverTimer.current = window.setTimeout(() => setActiveIndex(i), HOVER_DELAY);
  };

  return (
    <div
      className="relative hidden lg:flex lg:flex-col"
      style={{
        minHeight: "100vh",
        paddingLeft: "clamp(2rem, 5vw, 6rem)",
        paddingRight: "clamp(2rem, 5vw, 6rem)",
        paddingTop: "clamp(3.5rem, 7vh, 6rem)",
        paddingBottom: "clamp(3rem, 6vh, 5rem)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 80% 25%, rgba(53,105,226,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Header ── */}
      <div className="relative flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
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
              fontSize: "clamp(2.6rem, 4.5vw, 4rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Projects.
          </h2>
        </div>

        {/* Counter */}
        <div className="flex items-baseline gap-1.5">
          <AnimatePresence mode="wait">
            <motion.span
              key={project.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.7rem",
                fontWeight: 800,
                color: "var(--color-brand)",
                letterSpacing: "-0.02em",
              }}
            >
              {project.id}
            </motion.span>
          </AnimatePresence>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            / {pad2(count)}
          </span>
        </div>
      </div>

      {/* ── Tabs + arrows ── */}
      <div
        className="relative flex items-center justify-between gap-5 flex-wrap"
        style={{
          marginTop: "clamp(1.8rem, 3.5vh, 3rem)",
          marginBottom: "clamp(1.8rem, 3.5vh, 3rem)",
          paddingBottom: "clamp(1.2rem, 2.5vh, 2rem)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <ul className="flex items-center gap-2.5 flex-wrap">
          {PROJECTS.map((p, i) => (
            <li key={p.id}>
              <ProjectTab
                project={p}
                isActive={i === active}
                onSelect={() => go(i)}
                onHoverStart={() => onTabHoverStart(i)}
                onHoverEnd={clearHoverTimer}
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 flex-shrink-0">
          <RoundIconButton onClick={() => paginate(-1)} label="Previous project">
            <Chevron to="left" />
          </RoundIconButton>
          <RoundIconButton onClick={() => paginate(1)} label="Next project">
            <Chevron to="right" />
          </RoundIconButton>
        </div>
      </div>

      {/* ── Showcase ── */}
      <div className="relative flex-1 flex items-center">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={project.id}
            custom={dir}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: EASE }}
            className="grid w-full items-center"
            style={{
              gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
              gap: "clamp(2.5rem, 5vw, 5rem)",
            }}
          >
            {/* LEFT — screenshot slider */}
            <ScreenshotFrame project={project} />

            {/* RIGHT — readable info */}
            <ProjectInfo project={project} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────  Mobile / tablet stacked  ───────────────────────── */

function ProjectsMobile() {
  return (
    <div
      className="lg:hidden"
      style={{
        paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
        paddingRight: "clamp(1.5rem, 5vw, 4rem)",
        paddingTop: "clamp(4.5rem, 10vw, 7rem)",
        paddingBottom: "clamp(4.5rem, 10vw, 7rem)",
      }}
    >
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
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
            fontSize: "clamp(2.8rem, 12vw, 4rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          Projects.
        </h2>
      </motion.div>

      {/* Stacked cards */}
      <div className="flex flex-col gap-6">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.05 }}
            viewport={{ once: false, amount: 0.15 }}
            style={{
              borderRadius: "16px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "clamp(1.25rem, 5vw, 1.8rem)",
            }}
          >
            {/* Screenshot slider */}
            <div className="mb-6">
              <ScreenshotFrame project={p} />
            </div>

            <div className="flex items-center justify-between mb-4">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.12em",
                  color: "var(--color-brand)",
                }}
              >
                {p.id}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.52rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  textAlign: "right",
                  maxWidth: "60%",
                }}
              >
                {p.label}
              </span>
            </div>

            <h3
              className="font-extrabold text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 9vw, 2.6rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.04,
                marginBottom: "0.6rem",
              }}
            >
              {p.title}
            </h3>

            <div
              className="flex items-center gap-2.5 flex-wrap"
              style={{ marginBottom: "1.4rem" }}
            >
              <StatusChip status={p.status} />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {p.type}
              </span>
            </div>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                lineHeight: 1.68,
                letterSpacing: "-0.01em",
                color: "rgba(255,255,255,0.86)",
                marginBottom: "1.5rem",
                textWrap: "pretty",
              }}
            >
              {p.description}
            </p>

            <div className="mb-5">
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.54rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: "0.5rem",
                }}
              >
                My Role
              </span>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  lineHeight: 1.62,
                  letterSpacing: "-0.005em",
                  color: "rgba(255,255,255,0.58)",
                  textWrap: "pretty",
                }}
              >
                {p.role}
              </p>
            </div>

            <div className="mb-6">
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.54rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: "0.75rem",
                }}
              >
                Tech Stack
              </span>
              <StackTags stack={p.stack} />
            </div>

            <div
              style={{
                marginTop: "0.4rem",
                paddingTop: "1.4rem",
                borderTop: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <ProjectLinks project={p} />
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────  Section wrapper  ───────────────────────── */

export function Projects() {
  return (
    <section
      id="projects"
      className="relative border-t"
      style={{
        background: "#020202",
        borderColor: "rgba(255,255,255,0.04)",
      }}
    >
      <ProjectsDesktop />
      <ProjectsMobile />
    </section>
  );
}
