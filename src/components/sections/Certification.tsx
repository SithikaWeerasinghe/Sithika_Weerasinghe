"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

type Cert = {
  id: string; // slot number, e.g. "06"
  title: string; // human-readable certificate name
  provider: string; // issuing platform
  category: string; // skill area
  date: string;
  /**
   * Optional certificate preview image. Drop files in `public/certs/` and set
   * the path here, e.g. "/certs/ethical-hacker.png". A tasteful placeholder
   * card is shown when omitted.
   */
  image?: string;
  /**
   * LinkedIn credential / official verification link. Use "#" while it is still
   * pending — the verify button shows a non-clickable "soon" state until set.
   */
  credentialUrl: string;
};

const CERTS: Cert[] = [
  {
    id: "06",
    title: "Ethical Hacker",
    provider: "Cisco Networking Academy",
    category: "Cybersecurity",
    date: "Dec 2025",
    credentialUrl: "#",
  },
  {
    id: "05",
    title: "Introduction to Data Science",
    provider: "Cisco Networking Academy",
    category: "Data Science",
    date: "Dec 2025",
    credentialUrl: "#",
  },
  {
    id: "04",
    title: "Introduction to Cybersecurity",
    provider: "Cisco Networking Academy",
    category: "Cybersecurity",
    date: "Dec 2025",
    credentialUrl: "#",
  },
  {
    id: "03",
    title: "Introduction to Modern AI",
    provider: "Cisco Networking Academy",
    category: "Artificial Intelligence",
    date: "Dec 2025",
    credentialUrl: "#",
  },
  {
    id: "02",
    title: "E-Learning Theory and Practice",
    provider: "Alison",
    category: "Education Technology",
    date: "Oct 2025",
    credentialUrl: "#",
  },
  {
    id: "01",
    title: "Fundamentals of Digital Marketing",
    provider: "Google",
    category: "Digital Marketing",
    date: "Oct 2025",
    credentialUrl: "#",
  },
];

const PROVIDER_COLORS: Record<string, string> = {
  "Cisco Networking Academy": "#049fd9",
  Alison: "#2ecc71",
  Google: "#4285f4",
};

const EASE = [0.22, 1, 0.36, 1] as const;
// Hover-intent delay (ms) so sweeping the cursor across rows doesn't flicker.
const HOVER_DELAY = 90;
const providerColor = (p: string) => PROVIDER_COLORS[p] ?? "var(--color-brand)";

/* ─────────────────────────  Certificate row (one slot)  ───────────────────────── */

function CertRow({
  cert,
  isActive,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: {
  cert: Cert;
  isActive: boolean;
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const [hover, setHover] = useState(false);
  const lit = isActive || hover;
  const color = providerColor(cert.provider);

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
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="w-full flex items-center gap-3.5 text-left"
      style={{
        padding: "0.8rem 1rem",
        borderRadius: "11px",
        border: isActive
          ? "1px solid rgba(53,105,226,0.35)"
          : "1px solid rgba(255,255,255,0.06)",
        background: isActive
          ? "rgba(53,105,226,0.08)"
          : hover
          ? "rgba(255,255,255,0.03)"
          : "transparent",
        cursor: "pointer",
        transform: isActive ? "translateX(2px)" : "translateX(0)",
        transition:
          "background 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* Provider accent dot */}
      <span
        aria-hidden="true"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          flexShrink: 0,
          background: color,
          opacity: lit ? 1 : 0.5,
          boxShadow: lit ? `0 0 8px ${color}` : "none",
          transition: "opacity 0.3s ease, box-shadow 0.3s ease",
        }}
      />

      {/* Slot number */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.1em",
          width: "1.5rem",
          flexShrink: 0,
          color: isActive ? "var(--color-brand)" : "rgba(255,255,255,0.3)",
          transition: "color 0.3s ease",
        }}
      >
        {cert.id}
      </span>

      {/* Title + provider */}
      <span className="flex flex-col min-w-0" style={{ flex: 1, gap: "0.15rem" }}>
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.95rem",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: lit ? "#ffffff" : "rgba(255,255,255,0.72)",
            transition: "color 0.3s ease",
          }}
        >
          {cert.title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.56rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.34)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {cert.provider}
        </span>
      </span>

      {/* Category chip */}
      <span
        className="hidden sm:inline-flex"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.5rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: lit ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
          padding: "3px 9px",
          borderRadius: "9999px",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
          flexShrink: 0,
          whiteSpace: "nowrap",
          transition: "color 0.3s ease",
        }}
      >
        {cert.category}
      </span>

      {/* Active arrow */}
      <span
        aria-hidden="true"
        style={{
          color: "var(--color-brand)",
          flexShrink: 0,
          width: 12,
          display: "inline-flex",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateX(0)" : "translateX(-4px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M3 6h6M6.5 3.5 9 6 6.5 8.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

/* ─────────────────────────  Verify / credential button  ───────────────────────── */

function VerifyButton({ url }: { url: string }) {
  const pending = !url || url === "#";
  return (
    <a
      href={pending ? undefined : url}
      target={pending ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-disabled={pending}
      onClick={(e) => {
        if (pending) e.preventDefault();
      }}
      className="inline-flex items-center gap-2"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.6rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        textDecoration: "none",
        padding: "0.62rem 1.2rem",
        borderRadius: "9999px",
        color: pending ? "rgba(255,255,255,0.4)" : "#ffffff",
        background: pending ? "transparent" : "var(--color-brand)",
        border: pending
          ? "1px dashed rgba(255,255,255,0.14)"
          : "1px solid transparent",
        cursor: pending ? "not-allowed" : "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        if (pending) return;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(53,105,226,0.35)";
      }}
      onMouseLeave={(e) => {
        if (pending) return;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {pending ? "Credential Link Soon" : "View Credential"}
      {!pending && (
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M3 9L9 3M9 3H4M9 3V8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </a>
  );
}

/* ─────────────────────────  Placeholder when no image yet  ───────────────────────── */

function CertPlaceholder({ cert, color }: { cert: Cert; color: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2.5"
      style={{
        background:
          "radial-gradient(ellipse 75% 75% at 50% 32%, rgba(53,105,226,0.08) 0%, transparent 65%)",
      }}
    >
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="9" r="6" stroke={color} strokeWidth="1.2" />
        <circle cx="12" cy="9" r="2.6" stroke={color} strokeWidth="1" opacity="0.7" />
        <path
          d="M9 14.2 7.6 20 12 17.8 16.4 20 15 14.2"
          stroke={color}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.56rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color,
          opacity: 0.85,
        }}
      >
        {cert.provider}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.48rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        Certificate preview
      </span>
    </div>
  );
}

/* ─────────────────────────  Active certificate preview  ───────────────────────── */

function CertPreview({ cert }: { cert: Cert }) {
  const color = providerColor(cert.provider);
  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        padding: "clamp(1.1rem, 2vw, 1.5rem)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {/* Image / placeholder */}
          <div
            className="relative w-full"
            style={{
              aspectRatio: "1.55 / 1",
              borderRadius: "11px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "#070809",
            }}
          >
            {cert.image ? (
              <Image
                src={cert.image}
                alt={`${cert.title} certificate`}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                style={{ objectFit: "contain" }}
              />
            ) : (
              <CertPlaceholder cert={cert} color={color} />
            )}
          </div>

          {/* Meta */}
          <span
            className="block"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-brand)",
              marginTop: "1.3rem",
              marginBottom: "0.6rem",
            }}
          >
            Verified Credential
          </span>

          <h3
            className="font-extrabold text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {cert.title}
          </h3>

          {/* Provider · category · date */}
          <div
            className="flex items-center gap-2.5 flex-wrap"
            style={{ marginTop: "0.9rem", marginBottom: "1.5rem" }}
          >
            <span
              className="inline-flex items-center gap-2"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                padding: "4px 10px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: color,
                  boxShadow: `0 0 6px ${color}`,
                }}
              />
              {cert.provider}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                padding: "4px 10px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {cert.category}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.55rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {cert.date}
            </span>
          </div>

          <VerifyButton url={cert.credentialUrl} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────  Section  ───────────────────────── */

export function Certification() {
  const [active, setActive] = useState(0);

  // Hover-intent timer so quick cursor passes don't flicker the preview.
  const hoverTimer = useRef<number | null>(null);
  const clearHoverTimer = () => {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };
  useEffect(() => clearHoverTimer, []);

  // Click / tap — immediate, cancels any pending hover.
  const select = (i: number) => {
    clearHoverTimer();
    setActive(i);
  };

  // Desktop hover-to-activate, gated to real hover + fine-pointer devices so
  // touch tablets/phones keep tap-to-select.
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

  const cert = CERTS[active];

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
            "radial-gradient(ellipse 50% 55% at 18% 40%, rgba(53,105,226,0.045) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative mx-auto"
        style={{
          maxWidth: "1180px",
          paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
          paddingRight: "clamp(1.5rem, 5vw, 6rem)",
          paddingTop: "clamp(4rem, 8vw, 7rem)",
          paddingBottom: "clamp(4rem, 8vw, 7rem)",
        }}
      >
        {/* ── Section header ── */}
        <motion.div
          className="mb-10 flex items-end justify-between gap-6 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          viewport={{ once: false, amount: 0.3 }}
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
                Certification
              </span>
            </div>
            <h2
              className="font-extrabold text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              Cert Vault.
            </h2>
          </div>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              paddingBottom: "0.4rem",
            }}
          >
            {String(CERTS.length).padStart(2, "0")} Credentials
          </span>
        </motion.div>

        {/* ── List + preview ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
          style={{ gap: "clamp(1.5rem, 3vw, 3rem)", alignItems: "start" }}
        >
          {/* One-column certificate list */}
          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            {CERTS.map((c, i) => (
              <CertRow
                key={c.id}
                cert={c}
                isActive={i === active}
                onSelect={() => select(i)}
                onHoverStart={() => onHoverStart(i)}
                onHoverEnd={clearHoverTimer}
              />
            ))}
          </motion.div>

          {/* Active preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <CertPreview cert={cert} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
