"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

const GREETINGS = [
  "Hello.",
  "Holla.",
  "Ayubowan.",
  "Vanakkam.",
  "Hola.",
  "Bonjour.",
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Scroll-linked parallax: photo drifts down + fades as the hero leaves the viewport.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const photoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const portraitStyle = prefersReducedMotion
    ? undefined
    : { y: photoY, opacity: photoOpacity, scale: photoScale };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: "#020202" }}
    >
      {/* ── Ambient Cinematic Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Brand glow — very subtle, left-center */}
        <div
          className="absolute top-0 left-0 w-[50%] h-[60%] rounded-full blur-[180px]"
          style={{ background: "rgba(61,126,245,0.04)" }}
        />
        {/* Subtle Secondary Glow */}
        <div className="absolute bottom-[0%] right-[0%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full mix-blend-overlay" />
        
        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-noise pointer-events-none" />
      </div>

      {/* ── Portrait (right side, full height, masked) ── */}
      <motion.div
        className="absolute inset-y-0 right-0 z-0
                   w-full lg:w-[56%]
                   pointer-events-none"
        style={portraitStyle}
      >
        {/* Base image */}
        <Image
          src="/sithika-hero.png"
          alt="Sithika Weerasinghe"
          fill
          className="object-cover object-[48%_10%] lg:object-[46%_8%]
                     opacity-30 lg:opacity-75"
          priority
          sizes="(max-width: 1024px) 100vw, 56vw"
        />

        {/* Gradient masking layers to seamlessly blend the portrait into the dark background */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #020202 0%, #020202 6%, rgba(2,2,2,0.72) 26%, rgba(2,2,2,0.22) 52%, transparent 72%)" }} />
        <div className="absolute inset-x-0 bottom-0" style={{ height: "42%", background: "linear-gradient(to top, #020202 0%, rgba(2,2,2,0.75) 28%, rgba(2,2,2,0.2) 70%, transparent 100%)" }} />
        <div className="absolute inset-x-0 top-0" style={{ height: "16%", background: "linear-gradient(to bottom, rgba(2,2,2,0.9) 0%, transparent 100%)" }} />
        <div className="absolute inset-y-0 right-0" style={{ width: "22%", background: "linear-gradient(to left, rgba(2,2,2,0.5) 0%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 78% at 66% 36%, transparent 0%, rgba(2,2,2,0.08) 45%, rgba(2,2,2,0.48) 80%, #020202 100%)" }} />
        <div className="absolute inset-0 mix-blend-color" style={{ background: "rgba(20,50,110,0.18)" }} />
        <div className="absolute inset-0 mix-blend-soft-light" style={{ background: "radial-gradient(ellipse 55% 60% at 66% 30%, rgba(80,120,200,0.14) 0%, transparent 70%)" }} />
      </motion.div>

      {/* ── Main Content ── */}
      <Container className="relative z-10 w-full pt-28 pb-20 lg:py-0 lg:min-h-screen flex flex-col lg:justify-center">
        {/* Text column — left 55% on desktop, full width on mobile */}
        <div className="w-full lg:w-[52%] flex flex-col items-center text-center lg:items-start lg:text-left">

          {/* ── Rotating Greeting ── */}
          <div
            className="relative w-full flex justify-center lg:justify-start mb-6 sm:mb-8 pointer-events-none"
            style={{ height: "clamp(5rem, 13.5vw, 10.5rem)" }}
          >
            {GREETINGS.map((greeting, i) => {
              const isActive = index === i;
              const isPrevious = index === (i + 1) % GREETINGS.length;
              return (
                <h1
                  key={greeting}
                  aria-hidden={!isActive}
                  className="absolute text-display text-gradient select-none"
                  style={{
                    fontSize: "clamp(3.2rem, 10vw, 7rem)",
                    lineHeight: 1.2,
                    opacity: isActive ? 1 : 0,
                    transform: isActive
                      ? "translateY(0)"
                      : isPrevious
                        ? "translateY(-14px)"
                        : "translateY(14px)",
                    transition:
                      "opacity 1.2s ease, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {greeting}
                </h1>
              );
            })}
          </div>

          {/* ── Name Identity Block ── */}
          <div className="animate-fade-in delay-100 mb-7 sm:mb-9 w-full flex flex-col items-center lg:items-start">
            <div className="flex items-center justify-center lg:justify-start mb-4 sm:mb-5">
              <span
                className="text-label flex items-center"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.25)",
                  userSelect: "none",
                }}
              >
                <span className="text-brand mr-1" style={{ color: "var(--color-brand)" }}>&#x276E;</span>&nbsp;portfolio.2026&nbsp;<span className="text-brand ml-1" style={{ color: "var(--color-brand)" }}>&#x276F;</span>
              </span>
            </div>

            <div className="border-l-2 border-brand/50 pl-5 md:pl-7 py-1 text-center lg:text-left">
              <h2 className="font-display leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                <span
                  className="block font-medium uppercase text-white/50"
                  style={{
                    fontSize: "clamp(0.68rem, 1.2vw, 0.82rem)",
                    letterSpacing: "0.3em",
                    marginBottom: "0.5rem"
                  }}
                >
                  Creative Technologist
                </span>
                <span
                  className="block font-extrabold uppercase text-white"
                  style={{
                    fontSize: "clamp(1.8rem, 4.2vw, 3.4rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                  }}
                >
                  Sithika Weerasinghe
                </span>
              </h2>
            </div>

            {/* Social icons */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3 animate-fade-in delay-200">
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/SithikaWeerasinghe",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/sithika-weerasinghe",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  href: "https://instagram.com/sithika.weerasinghe",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ),
                },
                {
                  label: "Email",
                  href: "mailto:sithikaweerasinghe2005@gmail.com",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M2 7l10 7 10-7" />
                    </svg>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  className="group relative w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(53,105,226,0.06)",
                    border: "1px solid rgba(53,105,226,0.18)",
                  }}
                >
                  {/* Blue radial glow on hover */}
                  <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "radial-gradient(circle, rgba(53,105,226,0.22) 0%, transparent 72%)" }}
                  />
                  {/* Border brightens on hover */}
                  <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ border: "1px solid rgba(53,105,226,0.55)", borderRadius: "9999px" }}
                  />
                  <span className="relative text-brand/50 group-hover:text-brand transition-colors duration-300">
                    {icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* ── Scroll Indicator — right edge ── */}
      <div className="hidden lg:flex absolute bottom-12 right-12 flex-col items-center gap-6 z-30 animate-fade-in delay-300">
        <div
          className="text-label"
          style={{ color: "var(--muted)", writingMode: "vertical-rl", fontFamily: "var(--font-mono)" }}
        >
          SCROLL
        </div>
        <div
          className="w-px h-16 mt-2 relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/40 animate-slide-down-loop" />
        </div>
      </div>
    </section>
  );
}
