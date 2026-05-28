"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference pointer-events-auto">
        <Container className="flex items-center justify-between h-24">
          <Link href="/" className="text-2xl font-display font-extrabold text-white" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>
            SW.
          </Link>
          
          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 group"
          >
            <span className="text-[10px] text-white/80 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Menu
            </span>
            <div className="flex flex-col gap-1.5 items-end">
              <div className="w-6 h-[2px] bg-white group-hover:w-8 transition-all duration-300"></div>
              <div className="w-4 h-[2px] bg-white group-hover:w-8 transition-all duration-300"></div>
            </div>
          </button>
        </Container>
      </header>
 
      {/* Full Screen Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-[#020202] transition-transform duration-700 ease-[0.16,1,0.3,1] ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Cinematic background inside menu */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand/10 blur-[150px] rounded-full mix-blend-screen opacity-40 pointer-events-none" />

        <Container className="flex flex-col h-full relative z-10">
          <div className="flex items-center justify-between h-24 flex-shrink-0">
            <Link href="/" className="text-2xl font-display font-extrabold text-white" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>
              SW.
            </Link>
            <button 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 group"
            >
              <span className="text-[10px] text-white/80 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Close
              </span>
              <div className="w-8 h-8 relative flex items-center justify-center">
                <div className="absolute w-8 h-[2px] bg-white rotate-45 transition-transform group-hover:scale-110"></div>
                <div className="absolute w-8 h-[2px] bg-white -rotate-45 transition-transform group-hover:scale-110"></div>
              </div>
            </button>
          </div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 lg:pb-0">
            
            {/* Left Column: Sithika Weerasinghe brand treatment */}
            <div 
              className="hidden lg:flex lg:col-span-3 flex-col justify-end h-[50%] border-l border-white/10 pl-8 transition-all duration-700"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: '300ms'
              }}
            >
              <div style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-[9px] font-mono tracking-[0.25em] text-brand block mb-2 uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                  Portfolio / 2026
                </span>
                <span className="text-2xl font-extrabold text-white uppercase block tracking-tight">
                  Sithika
                </span>
                <span className="text-2xl font-extrabold text-white uppercase block tracking-tight -mt-1.5">
                  Weerasinghe
                </span>
                <span className="text-xs text-muted block mt-2 font-light" style={{ fontFamily: "var(--font-sans)" }}>
                  Computer Science Undergraduate & Creative Technologist
                </span>
              </div>
            </div>

            {/* Center Column: Main Numbered Navigation links */}
            <div className="col-span-1 lg:col-span-6 flex flex-col justify-center items-center lg:items-start lg:pl-16">
              <nav className="flex flex-col items-center lg:items-start gap-5 sm:gap-6 md:gap-8">
                {[
                  { label: 'Home', href: '#top' },
                  { label: 'Real Me', href: '#about' },
                  { label: 'Portfolio', href: '#projects' },
                  { label: 'Resume', href: '#resume' },
                  { label: 'Contact', href: '#contact' },
                ].map((item, i) => (
                  <Link 
                    key={item.label} 
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center text-4xl sm:text-5xl md:text-7xl text-white/80 hover:text-white hover:translate-x-3 transition-all duration-300 group"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateY(0)' : 'translateY(40px)',
                      transitionDelay: isOpen ? `${100 + i * 50}ms` : '0ms'
                    }}
                  >
                    <span className="text-xs sm:text-sm font-mono text-brand/60 group-hover:text-brand mr-4 sm:mr-6" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>
                      0{i + 1}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Column: Social Media Links */}
            <div 
              className="col-span-1 lg:col-span-3 flex lg:flex-col justify-center lg:justify-end lg:items-end gap-6 lg:gap-4 h-[50%] border-t lg:border-t-0 lg:border-r border-white/10 pt-6 lg:pt-0 lg:pr-8 text-sm transition-all duration-700"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                transitionDelay: '300ms'
              }}
            >
              <span className="hidden lg:block text-[9px] font-mono tracking-[0.25em] text-muted uppercase mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                Connect
              </span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                GitHub
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                Instagram
              </a>
              <a href="mailto:contact@sithika.com" className="text-white/60 hover:text-white transition-colors" style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>
                Email
              </a>
            </div>

          </div>

          {/* Bottom Mobile Brand Footer */}
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
