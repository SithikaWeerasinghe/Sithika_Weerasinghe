"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Premium scroll behavior: the header is transparent over the dark hero, then
  // fades in a subtle glass backdrop once the page scrolls — so it reads cleanly
  // over every section (including light project screenshots and cert images)
  // instead of inverting awkwardly the way mix-blend-difference did.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Fixed header — transparent over the hero, glass-backed once scrolled.
          z-[70] keeps it above the overlay (z-[60]). */}
      <header
        className="fixed top-0 left-0 right-0 z-[70] pointer-events-auto"
        style={{
          // Steady, always-present header bar — SW + MENU stay anchored at the
          // top. The glass just deepens slightly once scrolled, so nothing
          // "appears" or shifts mid-scroll.
          background: scrolled ? "rgba(2,2,2,0.72)" : "rgba(2,2,2,0.45)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid rgba(255,255,255,0.04)",
          boxShadow: scrolled ? "0 10px 30px -22px rgba(0,0,0,0.85)" : "none",
          transition:
            "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <Container className="flex items-center justify-between h-24">
          <Link
            href="/"
            className="text-2xl font-display font-extrabold text-white"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
          >
            SW.
          </Link>

          {/* Single toggle button — hamburger ↔ X */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-3 group -mr-2 sm:-mr-3 lg:-mr-5"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span
              className="text-[10px] text-white/80 group-hover:text-white transition-colors duration-200"
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              {isOpen ? "Close" : "Menu"}
            </span>

            {/* Animated bars */}
            <div style={{ width: "24px", height: "14px", position: "relative", flexShrink: 0 }}>
              {/* Bar 1 */}
              <span
                style={{
                  position: "absolute",
                  display: "block",
                  height: "2px",
                  borderRadius: "1px",
                  background: "white",
                  left: 0,
                  right: 0,
                  top: isOpen ? "6px" : "0",
                  transform: isOpen ? "rotate(45deg)" : "none",
                  transition: "top 0.32s cubic-bezier(0.16,1,0.3,1), transform 0.32s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
              {/* Bar 2 — shorter when closed, full-width when open */}
              <span
                style={{
                  position: "absolute",
                  display: "block",
                  height: "2px",
                  borderRadius: "1px",
                  background: "white",
                  right: 0,
                  width: isOpen ? "24px" : "15px",
                  top: isOpen ? "6px" : "12px",
                  transform: isOpen ? "rotate(-45deg)" : "none",
                  transition:
                    "top 0.32s cubic-bezier(0.16,1,0.3,1), transform 0.32s cubic-bezier(0.16,1,0.3,1), width 0.22s ease",
                }}
              />
            </div>
          </button>
        </Container>
      </header>

      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-[#020202] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Cinematic background */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand/10 blur-[150px] rounded-full mix-blend-screen opacity-40 pointer-events-none" />

        <Container className="flex flex-col h-full relative z-10">
          {/* Spacer matching fixed header height */}
          <div className="h-24 flex-shrink-0" />

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 lg:pb-0">

            {/* Left Column: Brand treatment */}
            <div
              className="hidden lg:flex lg:col-span-3 flex-col justify-end h-[50%] border-l border-white/10 pl-8 transition-all duration-700"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateX(0)" : "translateX(-20px)",
                transitionDelay: "300ms",
              }}
            >
              <div style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-[9px] font-mono tracking-[0.25em] text-brand block mb-2 uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                  Portfolio / 2026
                </span>
                <span className="text-2xl font-extrabold text-white uppercase block tracking-tight">Sithika</span>
                <span className="text-2xl font-extrabold text-white uppercase block tracking-tight -mt-1.5">Weerasinghe</span>
                <span className="text-xs text-muted block mt-2 font-light" style={{ fontFamily: "var(--font-sans)" }}>
                  Computer Science Undergraduate & Creative Technologist
                </span>
              </div>
            </div>

            {/* Center Column: Nav links */}
            <div className="col-span-1 lg:col-span-6 flex flex-col justify-center items-center lg:items-start lg:pl-16">
              <nav className="flex flex-col items-center lg:items-start gap-5 sm:gap-6 md:gap-8">
                {[
                  { label: "Home", href: "#top" },
                  { label: "Real Me", href: "#about" },
                  { label: "Portfolio", href: "#projects" },
                  // Archived with the testimonials section — restore alongside it.
                  // { label: "What They Say", href: "#testimonials" },
                  { label: "Certification", href: "#certification" },
                  { label: "Contact", href: "#contact" },
                ].map((item, i) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="relative flex items-center text-3xl sm:text-4xl md:text-[3.5rem] text-white/25 hover:text-white hover:translate-x-5 transition-all duration-300 group"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateY(0)" : "translateY(40px)",
                      transitionDelay: isOpen ? `${100 + i * 55}ms` : "0ms",
                    }}
                  >
                    {/* Blue accent that slides in on hover */}
                    <span
                      className="absolute left-[-28px] top-1/2 -translate-y-1/2 h-[2px] w-0 group-hover:w-5 transition-all duration-300"
                      style={{ background: "var(--color-brand)", transitionDelay: "30ms" }}
                    />
                    <span
                      className="text-xs sm:text-sm font-mono mr-4 sm:mr-6 transition-all duration-300 text-brand/30 group-hover:text-brand group-hover:scale-110"
                      style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}
                    >
                      0{i + 1}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Column: Social links */}
            <div
              className="col-span-1 lg:col-span-3 flex lg:flex-col justify-center lg:justify-end lg:items-end gap-6 lg:gap-4 h-[50%] border-t lg:border-t-0 lg:border-r border-white/10 pt-6 lg:pt-0 lg:pr-8 text-sm transition-all duration-700"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateX(0)" : "translateX(20px)",
                transitionDelay: "300ms",
              }}
            >
              <span className="hidden lg:block text-[9px] font-mono tracking-[0.25em] text-muted uppercase mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                Connect
              </span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200" style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200" style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                GitHub
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-200" style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                Instagram
              </a>
              <a href="mailto:sithikaweerasinghe2005@gmail.com" className="text-white/40 hover:text-white transition-colors duration-200" style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                Email
              </a>
            </div>

          </div>

          {/* Mobile brand footer */}
          <div className="lg:hidden text-center pb-6 flex-shrink-0">
            <span className="text-[9px] font-mono tracking-[0.2em] text-brand uppercase" style={{ fontFamily: "var(--font-mono)" }}>
              Sithika Weerasinghe
            </span>
          </div>
        </Container>
      </div>
    </>
  );
}
