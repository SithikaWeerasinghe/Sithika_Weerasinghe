"use client";

import { useState, type ReactNode } from "react";
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
   * Leave empty to show the on-theme "screenshot coming soon" placeholder.
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
    images: [],
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
    images: [],
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

/* ─────────────────────────  Small shared pieces  ───────────────────────── */

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

/** Glass circular control used by the screenshot slider. */
function RoundIconButton({
  onClick,
  disabled,
  label,
  children,
  size = 40,
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

function StackTags({ stack }: { stack: string[] }) {
  if (stack.length === 0) {
    return (
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        Stack updating soon
      </span>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((t) => (
        <span
          key={t}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.5)",
            padding: "4px 9px",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "3px",
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

/* ─────────────────────────  Number badge  ───────────────────────── */

function ProjectNumberBadge({ id, total }: { id: string; total: number }) {
  return (
    <div className="flex items-baseline gap-2.5">
      <span
        className="font-extrabold"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "var(--color-brand)",
        }}
      >
        {id}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        / {pad2(total)}
      </span>
    </div>
  );
}

/* ─────────────────────────  Screenshot slider  ───────────────────────── */

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? "6%" : "-6%", scale: 1.02 }),
  center: { opacity: 1, x: "0%", scale: 1 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? "-6%" : "6%", scale: 1.02 }),
};

function ProjectImageSlider({ project }: { project: Project }) {
  // Every project keeps its own image index + slide direction.
  const [[index, dir], setIndex] = useState<[number, number]>([0, 0]);
  const images = project.images;
  const count = images.length;
  const multiple = count > 1;

  const paginate = (delta: number) => {
    if (!multiple) return;
    setIndex(([i]) => [(i + delta + count) % count, delta]);
  };
  const goTo = (i: number) => setIndex(([cur]) => [i, i > cur ? 1 : -1]);

  const host = project.live
    ? project.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${project.title.toLowerCase().replace(/\s+/g, "")}.preview`;

  return (
    <div className="relative w-full">
      {/* Soft glow behind the frame for cinematic depth */}
      <div
        className="absolute -inset-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(53,105,226,0.13) 0%, transparent 70%)",
          filter: "blur(6px)",
        }}
      />

      {/* Browser-style frame */}
      <div
        className="relative"
        style={{
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.09)",
          background: "rgba(255,255,255,0.02)",
          overflow: "hidden",
          boxShadow: "0 30px 70px -30px rgba(0,0,0,0.75)",
        }}
      >
        {/* Chrome bar */}
        <div
          className="flex items-center gap-3"
          style={{
            padding: "0.7rem 1rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.14)",
                }}
              />
            ))}
          </div>
          <div className="flex-1 flex justify-center">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.56rem",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.32)",
                padding: "0.18rem 0.85rem",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                maxWidth: "70%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {host}
            </span>
          </div>
          {/* Spacer balances the traffic-light dots */}
          <div style={{ width: 39 }} />
        </div>

        {/* Image stage */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "16 / 10", background: "#050608" }}
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
                  sizes="(max-width: 1024px) 92vw, 50vw"
                  style={{ objectFit: "cover" }}
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <ScreenshotPlaceholder project={project} />
          )}

          {/* Top sheen */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0"
            style={{
              height: "30%",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)",
            }}
          />
        </div>
      </div>

      {/* Controls — only when there is more than one screenshot to slide */}
      {multiple && (
        <div
          className="flex items-center justify-between"
          style={{ marginTop: "1.1rem" }}
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
                  width: i === index ? 22 : 7,
                  height: 7,
                  borderRadius: "9999px",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  background:
                    i === index ? "var(--color-brand)" : "rgba(255,255,255,0.18)",
                  transition: "width 0.35s ease, background 0.35s ease",
                }}
              />
            ))}
          </div>

          {/* Counter + prev / next */}
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
              <span style={{ color: "rgba(255,255,255,0.2)" }}> / {pad2(count)}</span>
            </span>
            <RoundIconButton
              onClick={() => paginate(-1)}
              label="Previous screenshot"
              size={38}
            >
              <Chevron to="left" />
            </RoundIconButton>
            <RoundIconButton
              onClick={() => paginate(1)}
              label="Next screenshot"
              size={38}
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

/* ─────────────────────────  Featured case-study card  ───────────────────────── */

function ProjectShowcaseCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  // Alternate the image / text columns for an editorial zig-zag rhythm on
  // desktop. Mobile always stacks image first, then the writeup.
  const reverse = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      viewport={{ once: false, amount: 0.2 }}
      className="relative"
      style={{
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        overflow: "hidden",
        padding: "clamp(1.6rem, 3.5vw, 3.2rem)",
        transition: "border-color 0.4s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
      }}
    >
      {/* Oversized ghost number — reinforces the numbered-project identity */}
      <span
        aria-hidden="true"
        className="absolute select-none font-extrabold pointer-events-none"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(9rem, 20vw, 18rem)",
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 0.8,
          color: "rgba(255,255,255,0.022)",
          top: "-1.5rem",
          right: reverse ? "auto" : "1.5rem",
          left: reverse ? "1.5rem" : "auto",
        }}
      >
        {project.id}
      </span>

      {/* Corner brand glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: reverse
            ? "radial-gradient(ellipse 50% 55% at 6% 0%, rgba(53,105,226,0.06) 0%, transparent 60%)"
            : "radial-gradient(ellipse 50% 55% at 94% 0%, rgba(53,105,226,0.06) 0%, transparent 60%)",
        }}
      />

      {/* ── Card header — number + title + type ── */}
      <div className="relative flex items-start justify-between gap-6 mb-8">
        <div className="min-w-0">
          <div className="mb-4">
            <ProjectNumberBadge id={project.id} total={total} />
          </div>

          <h3
            className="font-extrabold text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              marginBottom: "0.7rem",
            }}
          >
            {project.title}
          </h3>

          {/* Human subtitle (label) */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
              fontWeight: 500,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.7)",
              marginBottom: "0.6rem",
              maxWidth: "34ch",
            }}
          >
            {project.label}
          </p>

          {/* Category (type) */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.34)",
            }}
          >
            {project.type}
          </span>
        </div>

        {/* Status chip */}
        <span
          className="flex-shrink-0"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-brand)",
            padding: "5px 11px",
            borderRadius: "9999px",
            background: "rgba(53,105,226,0.1)",
            border: "1px solid rgba(53,105,226,0.22)",
            whiteSpace: "nowrap",
          }}
        >
          {project.status}
        </span>
      </div>

      {/* ── Body — image slider + readable writeup ── */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Image slider */}
        <div
          className={`order-1 ${reverse ? "lg:order-2" : "lg:order-1"}`}
        >
          <ProjectImageSlider project={project} />
        </div>

        {/* Writeup */}
        <div className={`order-2 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
          {/* Description — large, high-contrast, fully visible */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1.05rem, 1.15vw, 1.2rem)",
              lineHeight: 1.78,
              color: "rgba(255,255,255,0.86)",
              marginBottom: "2rem",
              maxWidth: "54ch",
            }}
          >
            {project.description}
          </p>

          {/* My Role */}
          <div className="mb-7">
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "0.56rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "0.6rem",
              }}
            >
              My Role
            </span>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.95rem",
                lineHeight: 1.68,
                color: "rgba(255,255,255,0.62)",
                maxWidth: "54ch",
              }}
            >
              {project.role}
            </p>
          </div>

          {/* Tech Stack */}
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

          {/* Links */}
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────  Section  ───────────────────────── */

export function Projects() {
  const total = PROJECTS.length;

  return (
    <section
      id="projects"
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
            "radial-gradient(ellipse 50% 40% at 85% 8%, rgba(53,105,226,0.05) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative"
        style={{
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
          paddingTop: "clamp(5rem, 10vw, 9rem)",
          paddingBottom: "clamp(5rem, 10vw, 9rem)",
        }}
      >
        {/* ── Section header ── */}
        <motion.div
          className="mb-14 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          viewport={{ once: false, amount: 0.4 }}
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
              Selected Work
            </span>
          </div>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2
              className="font-extrabold text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.2rem, 7vw, 6rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Projects.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.45)",
                maxWidth: "32ch",
              }}
            >
              A closer look at the work — each one explored as its own case study.
            </p>
          </div>
        </motion.div>

        {/* ── Stacked featured cards ── */}
        <div className="flex flex-col gap-7 lg:gap-12">
          {PROJECTS.map((project, i) => (
            <ProjectShowcaseCard
              key={project.id}
              project={project}
              index={i}
              total={total}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
