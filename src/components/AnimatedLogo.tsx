"use client";

/**
 * Temporary premium signature / wordmark for the splash intro.
 *
 * The splash animation in `SplashScreen` targets these class names:
 *   .splash-logo     — the whole group (subtle scale settle)
 *   .splash-eyebrow  — the small mono label (fade up)
 *   .splash-name     — the signature wordmark (left-to-right reveal)
 *   .splash-rule     — the thin accent line (scaleX draw)
 *
 * To swap in a real signature later, replace the <h1 className="splash-name">
 * below with an inline <svg className="splash-name"> … </svg>. Nothing else
 * needs to change — the animation simply reveals whatever carries that class.
 */
export function AnimatedLogo() {
  return (
    <div
      className="splash-logo relative text-center"
      style={{ padding: "0 1.5rem", willChange: "transform" }}
    >
      <span
        className="splash-eyebrow"
        style={{
          display: "block",
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(0.55rem, 1.4vw, 0.68rem)",
          letterSpacing: "0.42em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          marginBottom: "clamp(1rem, 2.5vh, 1.6rem)",
          paddingLeft: "0.42em", // optical balance for the wide tracking
        }}
      >
        Portfolio — 2026
      </span>

      {/* TEMPORARY signature wordmark — replace with a real <svg> later. */}
      <h1
        className="splash-name"
        style={{
          display: "inline-block",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(1.45rem, 6.5vw, 5rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: "#ffffff",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        Sithika Weerasinghe
        <span style={{ color: "var(--color-brand)" }}>.</span>
      </h1>

      <div
        className="splash-rule"
        style={{
          height: "1.5px",
          width: "clamp(3rem, 8vw, 5rem)",
          margin: "clamp(1.1rem, 2.6vh, 1.7rem) auto 0",
          background:
            "linear-gradient(to right, transparent, var(--color-brand), transparent)",
          transformOrigin: "center",
          transform: "scaleX(0)",
        }}
      />
    </div>
  );
}
