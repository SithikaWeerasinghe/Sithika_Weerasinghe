"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatedLogo } from "./AnimatedLogo";

const SPLASH_KEY = "hasViewedSplash";

/**
 * Premium full-screen intro. Plays a cinematic signature reveal once per browser
 * tab session, then lifts away to reveal the page.
 *
 * Session logic (sessionStorage = per tab, cleared when the tab closes):
 *   - first visit in a session  → play the intro, then set the flag + unmount
 *   - already seen this session  → unmount immediately (no replay)
 *
 * Animation lifecycle is handled by @gsap/react's useGSAP, which runs as a
 * layout effect (so the "already seen" case hides before paint) and auto-reverts
 * its GSAP context on unmount — no leaks, no detached-node tweens.
 */
export function SplashScreen() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  // Safety net: always restore scroll if the splash unmounts for any reason
  // (e.g. dev hot-reload) so the page can never get stuck locked.
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  useGSAP(
    () => {
      // Already seen this tab session → don't replay; unmount before paint.
      if (sessionStorage.getItem(SPLASH_KEY) === "true") {
        setDone(true);
        return;
      }

      // Lock scrolling while the intro plays (restored in finish()).
      const html = document.documentElement;
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      const finish = () => {
        html.style.overflow = "";
        document.body.style.overflow = "";
        sessionStorage.setItem(SPLASH_KEY, "true");
        setDone(true);
      };

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Reduced motion: show the mark briefly, then a gentle fade — no sweep/scale.
      if (reduceMotion) {
        gsap.set([".splash-name", ".splash-rule"], {
          autoAlpha: 1,
          clipPath: "inset(0 0% 0 0)",
          y: 0,
          scaleX: 1,
        });
        gsap
          .timeline({ onComplete: finish })
          .to(".splash-progress-fill", { scaleX: 1, duration: 0.8, ease: "none" }, 0)
          .to(root.current, { autoAlpha: 0, duration: 0.5, ease: "power2.inOut" }, 0.9);
        return;
      }

      // Initial states.
      gsap.set(".splash-name", { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".splash-rule", { scaleX: 0 });
      gsap.set(".splash-progress-fill", { scaleX: 0 });

      // Cinematic sequence (~3.2s total — premium but not slow).
      gsap
        .timeline({ defaults: { ease: "power3.out" }, onComplete: finish })
        // progress line fills across the whole intro
        .to(".splash-progress-fill", { scaleX: 1, duration: 2.1, ease: "none" }, 0)
        // signature reveals left → right (like it's being written)
        .to(
          ".splash-name",
          { clipPath: "inset(0 0% 0 0)", duration: 1.0, ease: "power3.inOut" },
          0.4
        )
        // accent line draws
        .to(".splash-rule", { scaleX: 1, duration: 0.6 }, 1.05)
        // very subtle scale settle (not a pulse)
        .to(".splash-logo", { scale: 1.015, duration: 0.55, ease: "sine.inOut" }, 1.6)
        .to(".splash-logo", { scale: 1, duration: 0.5, ease: "sine.inOut" }, 2.15)
        // mark fades just before the curtain lifts
        .to(
          [".splash-name", ".splash-rule"],
          { autoAlpha: 0, y: -12, duration: 0.4, ease: "power2.in" },
          2.25
        )
        // curtain exits upward, revealing the hero
        .to(root.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, 2.4);
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="splash-root"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200, // above navbar (z-70) and menu overlay (z-60)
        background: "#020202", // matches the hero for a seamless reveal
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {/* Subtle cool-blue glow */}
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 45% at 50% 45%, rgba(53,105,226,0.09) 0%, transparent 70%)",
        }}
      />

      {/* Film grain — same texture as the hero, for a cohesive transition */}
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/noise.svg')",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />

      <AnimatedLogo />

      {/* Thin progress line near the bottom */}
      <div
        className="splash-progress"
        style={{
          position: "absolute",
          bottom: "clamp(2.5rem, 6vh, 4rem)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(180px, 40vw)",
          height: "2px",
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          className="splash-progress-fill"
          style={{
            width: "100%",
            height: "100%",
            background: "var(--color-brand)",
            transformOrigin: "left center",
            transform: "scaleX(0)",
            borderRadius: "9999px",
          }}
        />
      </div>
    </div>
  );
}
