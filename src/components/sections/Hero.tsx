"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import Image from "next/image";

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

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
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
      <div
        className="absolute inset-y-0 right-0 z-0
                   w-full lg:w-[56%]
                   pointer-events-none"
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
      </div>

      {/* ── Main Content ── */}
      <Container className="relative z-10 w-full pt-28 pb-20 lg:py-0 lg:min-h-screen flex flex-col lg:justify-center">
        {/* Text column — left 55% on desktop, full width on mobile */}
        <div className="w-full lg:w-[52%] flex flex-col items-center text-center lg:items-start lg:text-left">

          {/* ── Rotating Greeting ── */}
          <div
            className="relative w-full flex justify-center lg:justify-start mb-6 sm:mb-8 pointer-events-none"
            style={{ height: "clamp(4rem, 12vw, 9rem)" }}
          >
            {GREETINGS.map((greeting, i) => {
              const isActive = index === i;
              const isPrevious = index === (i + 1) % GREETINGS.length;
              return (
                <h1
                  key={greeting}
                  aria-hidden={!isActive}
                  className="absolute text-display leading-none text-gradient select-none"
                  style={{
                    fontSize: "clamp(3.2rem, 10vw, 7rem)",
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
                className="text-label"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.25)",
                  userSelect: "none",
                }}
              >
                &#x276E;&nbsp;portfolio.2026&nbsp;&#x276F;
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

            {/* Role line */}
            <p
              className="mt-6 font-light text-center lg:text-left max-w-xl"
              style={{
                fontSize: "clamp(0.65rem, 1.1vw, 0.78rem)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--muted)",
                lineHeight: 1.9,
                fontFamily: "var(--font-sans)",
              }}
            >
              Computer Science Undergraduate
              <span className="inline-block sm:mx-2.5 mx-1.5 opacity-25">·</span>
              Creative Technologist
              <span className="inline-block sm:mx-2.5 mx-1.5 opacity-25">·</span>
              Developer & Designer
            </p>
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
