"use client";

import { useCallback, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "motion/react";

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
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────  Shared small pieces  ───────────────────────── */

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

/* ─────────────────────────  Detail panel (desktop)  ───────────────────────── */

function DetailPanel({ project }: { project: Project }) {
  // Keep the previous listener's teardown so we can detach when the panel
  // re-mounts (the inner block remounts on every project change).
  const detachWheel = useRef<(() => void) | null>(null);

  // Capture-and-release: while the description still has room to scroll in the
  // wheel's direction, scroll it here and stop the page from advancing the
  // project. At the top/bottom edge we do nothing, so the wheel "releases" to
  // the page and moves to the prev/next project — so it never feels trapped.
  const attachScroller = useCallback((node: HTMLDivElement | null) => {
    detachWheel.current?.();
    detachWheel.current = null;
    if (!node) return;

    const onWheel = (e: WheelEvent) => {
      const canScroll = node.scrollHeight > node.clientHeight + 1;
      if (!canScroll) return; // nothing to read — let the page change projects

      const atTop = node.scrollTop <= 0;
      const atBottom =
        node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      if ((goingDown && !atBottom) || (goingUp && !atTop)) {
        e.preventDefault(); // hold the page; scroll the description instead
        node.scrollTop += e.deltaY;
      }
      // else: at an edge → fall through to native scroll → next/prev project
    };

    // Non-passive so preventDefault() can hold the page scroll.
    node.addEventListener("wheel", onWheel, { passive: false });
    detachWheel.current = () => node.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        borderRadius: "20px",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.07)",
        padding: "clamp(2rem, 3vw, 3.2rem)",
      }}
    >
      {/* Soft blue glow inside the panel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 100% 0%, rgba(53,105,226,0.08) 0%, transparent 60%)",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.62, ease: EASE }}
          className="relative flex flex-col h-full"
        >
          {/* ── Header (fixed) ── */}
          <div className="flex-shrink-0">
            {/* Eyebrow label */}
            <span
              className="block mb-5"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
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
                fontSize: "clamp(2.2rem, 3.2vw, 3.3rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
                marginBottom: "0.9rem",
              }}
            >
              {project.title}
            </h3>

            {/* Meta row — status chip + type */}
            <div className="flex items-center gap-3 flex-wrap" style={{ marginBottom: "1.6rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-brand)",
                  padding: "3px 9px",
                  borderRadius: "9999px",
                  background: "rgba(53,105,226,0.1)",
                  border: "1px solid rgba(53,105,226,0.22)",
                  whiteSpace: "nowrap",
                }}
              >
                {project.status}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.32)",
                }}
              >
                {project.type}
              </span>
            </div>
          </div>

          {/* ── Scrollable body ── */}
          <div className="relative flex-1 min-h-0">
            <div
              ref={attachScroller}
              className="premium-scroll h-full overflow-y-auto pr-3"
              style={{ paddingBottom: "1.5rem" }}
            >
              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.95rem, 1.1vw, 1.08rem)",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.72)",
                  marginBottom: "1.9rem",
                  maxWidth: "48ch",
                }}
              >
                {project.description}
              </p>

              {/* Role */}
              <div className="mb-7">
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.56rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: "0.55rem",
                  }}
                >
                  My Role
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.55)",
                    maxWidth: "50ch",
                  }}
                >
                  {project.role}
                </p>
              </div>

              {/* Stack */}
              <div>
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
            </div>

            {/* Bottom fade — hints at more scrollable content */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0"
              style={{
                height: "2.5rem",
                background:
                  "linear-gradient(to bottom, transparent, rgba(4,5,8,0.9))",
              }}
            />
          </div>

          {/* ── Footer (pinned) — action buttons ── */}
          <div
            className="flex-shrink-0"
            style={{
              marginTop: "1.4rem",
              paddingTop: "1.4rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <ProjectLinks project={project} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────  Desktop pinned experience  ───────────────────────── */

function ProjectsDesktop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = PROJECTS.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress → active project index
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(p * count)));
    setActive((prev) => (prev === next ? prev : next));
  });

  // Vertical progress bar fill
  const progressScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Click a title → scroll to the middle of that project's segment
  const scrollToIndex = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + (scrollable * (i + 0.5)) / count;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div
      ref={sectionRef}
      className="relative hidden lg:block"
      style={{ height: `${count * 118}vh` }}
    >
      {/* Pinned frame */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 88% 30%, rgba(53,105,226,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Top header bar */}
        <div
          className="relative flex items-end justify-between"
          style={{
            paddingLeft: "clamp(2rem, 5vw, 6rem)",
            paddingRight: "clamp(2rem, 5vw, 6rem)",
            paddingTop: "clamp(2.5rem, 5vh, 4.5rem)",
          }}
        >
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
                fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Projects.
            </h2>
          </div>

          {/* Counter */}
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={PROJECTS[active].id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: "var(--color-brand)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {PROJECTS[active].id}
                </motion.span>
              </AnimatePresence>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.2)",
                }}
              >
                / {String(count).padStart(2, "0")}
              </span>
            </div>

            {/* Active project label */}
            <AnimatePresence mode="wait">
              <motion.span
                key={PROJECTS[active].id + "-label"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  marginTop: "0.35rem",
                }}
              >
                {PROJECTS[active].title}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Main two-column area */}
        <div
          className="relative flex-1 grid items-center"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 5vw, 6rem)",
            paddingLeft: "clamp(2rem, 5vw, 6rem)",
            paddingRight: "clamp(2rem, 5vw, 6rem)",
            paddingBottom: "clamp(2rem, 4vh, 3.5rem)",
          }}
        >
          {/* LEFT — project list */}
          <div className="flex items-center gap-7 h-full">
            {/* Progress rail */}
            <div
              className="relative flex-shrink-0"
              style={{
                width: "2px",
                height: "62%",
                background: "rgba(255,255,255,0.06)",
                borderRadius: "2px",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "var(--color-brand)",
                  borderRadius: "2px",
                  transformOrigin: "top",
                  scaleY: progressScaleY,
                }}
              />
            </div>

            {/* Titles */}
            <ul className="flex flex-col gap-5 xl:gap-7">
              {PROJECTS.map((p, i) => {
                const isActive = i === active;
                return (
                  <li key={p.id}>
                    <button
                      onClick={() => scrollToIndex(i)}
                      className="group flex items-center gap-5 text-left"
                      style={{ cursor: "pointer" }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          letterSpacing: "0.1em",
                          color: isActive
                            ? "var(--color-brand)"
                            : "rgba(255,255,255,0.2)",
                          transition: "color 0.4s ease",
                          width: "1.8rem",
                          flexShrink: 0,
                        }}
                      >
                        {p.id}
                      </span>
                      <span
                        className="font-extrabold"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: isActive
                            ? "clamp(2rem, 3vw, 2.9rem)"
                            : "clamp(1.8rem, 2.6vw, 2.5rem)",
                          letterSpacing: "-0.03em",
                          lineHeight: 1.05,
                          color: isActive ? "#ffffff" : "rgba(255,255,255,0.34)",
                          transform: isActive
                            ? "translateX(5px)"
                            : "translateX(0)",
                          transition:
                            "color 0.55s cubic-bezier(0.22,1,0.36,1), font-size 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)",
                          display: "inline-block",
                        }}
                      >
                        {p.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT — detail panel */}
          <div className="h-[70%] max-h-[640px] min-h-[440px]">
            <DetailPanel project={PROJECTS[active]} />
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="relative flex items-center justify-center gap-3"
          style={{ paddingBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.18)",
            }}
          >
            {active < count - 1 ? "Scroll to explore" : "End of showcase"}
          </span>
        </div>
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
      <div className="flex flex-col gap-5">
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
              padding: "clamp(1.5rem, 6vw, 2.2rem)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
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

            <span
              style={{
                display: "block",
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                marginBottom: "1.3rem",
              }}
            >
              {p.type}
            </span>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.92rem",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.68)",
                marginBottom: "1.5rem",
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
                  fontSize: "0.82rem",
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.52)",
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

            <ProjectLinks project={p} />
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
