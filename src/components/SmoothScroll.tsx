"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide smooth scrolling via Lenis.
 *
 * Lenis runs in its default mode: it lerps the *real* document scroll
 * position (it does NOT use a transform wrapper). That means `position:
 * sticky` and Framer/Motion `useScroll` keep reading the true scroll
 * position, so the pinned Projects section continues to work untouched —
 * it just feels smoother on the way in, through, and out.
 *
 * Mobile: touch smoothing stays OFF (Lenis default `syncTouch: false`), so
 * phones/tablets use native momentum scrolling — reliable, no lag.
 * Accessibility: respects `prefers-reduced-motion` by not initialising.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Honor reduced-motion users — let the browser scroll natively.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      // Gentle exponential ease-out — premium, not floaty.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth in-page anchor navigation (navbar menu links).
    function onAnchorClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      if (href === "#top") {
        e.preventDefault();
        lenis.scrollTo(0);
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement);
    }

    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
