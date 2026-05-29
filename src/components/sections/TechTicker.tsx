const TECHS = [
  {
    name: "React",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" width="17" height="17" aria-hidden="true">
        <circle cx="12" cy="12" r="2.1" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.2 5h1.6v5.2l4-5.2h2L14 13.1l4.4 5.9h-2l-5.6-7.5V17h-1.6V7z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path fill="white" d="M14.5 12.5H12V11h6v1.5h-2.5V18H14.5v-5.5zM8.5 13.5c.28.4.72.7 1.2.7.5 0 .8-.25.8-.62 0-.4-.3-.58-1-.87C8.38 12.28 7.5 11.8 7.5 10.7 7.5 9.5 8.46 8.8 9.7 8.8c.9 0 1.6.3 2.1.9l-1 1c-.25-.34-.6-.55-1.05-.55-.4 0-.65.2-.65.5 0 .35.28.5.98.8 1.1.45 1.97.95 1.97 2.1 0 1.3-1 2.1-2.4 2.1-1 0-1.9-.38-2.46-1.1l1.31-1.05z" />
      </svg>
    ),
  },
  {
    name: "Python",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
        <path d="M12 2c-1.7 0-3.1.14-4.2.38C5.8 2.8 5 3.8 5 5v2h7v1H4.5C3.1 8 2 9.3 2 11c0 .57.05 1.1.16 1.6C2.6 14.6 4.1 16 5.9 16H7v-2.5C7 12.1 8.1 11 9.5 11H15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2-.5-.67-1.7-1-3-1zm-2.5 1.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM17 8v2.5c0 1.38-1.1 2.5-2.5 2.5H9c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2 .5.67 1.7 1 3 1s2.5-.33 3-1c2-.42 3-1.42 3-3v-2h-7v-1h7.5c1.38 0 2.5-1.12 2.5-2.5 0-.57-.05-1.1-.16-1.6C21.4 9.4 19.9 8 18.1 8H17zm-3.5 9.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
        <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.17 1.174.664 1.716 1.207C13.248 10.36 14.16 11.3 16.5 11.3c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.17-1.174-.664-1.716-1.207C15.252 6.94 14.34 6 12 6zM7.5 11.3C5.1 11.3 3.6 12.5 3 14.9c.9-1.2 1.95-1.65 3.15-1.35.685.17 1.174.664 1.716 1.207C8.748 15.66 9.66 16.6 12 16.6c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.17-1.174-.664-1.716-1.207C10.752 12.24 9.84 11.3 7.5 11.3z" />
      </svg>
    ),
  },
  {
    name: "Figma",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
        <path d="M8 2a3 3 0 000 6h3V2H8zM8 10a3 3 0 000 6h3v-6H8zM11 16a3 3 0 106 0 3 3 0 00-6 0zM14 2a3 3 0 110 6h-3V2h3zM11 8a3 3 0 100 6V8z" />
      </svg>
    ),
  },
  {
    name: "HTML5 / CSS3",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
        <path d="M3 2l1.68 18.39L12 22l7.32-1.61L21 2H3zm14.23 6.32H8.41l.22 2.41h8.39l-.66 7.46L12 19.5l-4.36-1.29-.3-3.38h2.37l.16 1.74L12 17.2l2.13-.63.22-2.51H7.75L7.1 8.32h9.85l-.72 0z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
        <path d="M12 1.85c-.27 0-.55.07-.78.2L3.78 6.35c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l7.44 4.3c.23.13.5.2.78.2s.55-.07.78-.2l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36L12.78 2.05c-.23-.13-.5-.2-.78-.2zm-.02 2.1l6.4 3.7-2.56 1.48-3.84-2.22V3.95zm-1.18.05v2.71L6.96 9.13 4.4 7.65l6.42-3.7zM4 9.15l2.56 1.48v2.94L4 15.05V9.15zm15.6 0v5.9l-2.56-1.48v-2.94L19.6 9.15zM8.15 11.5l3.85 2.22v4.45l-3.85-2.22V11.5zm7.7 0v4.45l-3.85 2.22v-4.45l3.85-2.22z" />
      </svg>
    ),
  },
  {
    name: "ESP32",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width="17" height="17" aria-hidden="true">
        <rect x="6" y="6" width="12" height="12" rx="1.5" />
        <line x1="9" y1="6" x2="9" y2="3" strokeLinecap="round" />
        <line x1="12" y1="6" x2="12" y2="3" strokeLinecap="round" />
        <line x1="15" y1="6" x2="15" y2="3" strokeLinecap="round" />
        <line x1="9" y1="18" x2="9" y2="21" strokeLinecap="round" />
        <line x1="12" y1="18" x2="12" y2="21" strokeLinecap="round" />
        <line x1="15" y1="18" x2="15" y2="21" strokeLinecap="round" />
        <line x1="6" y1="9" x2="3" y2="9" strokeLinecap="round" />
        <line x1="6" y1="12" x2="3" y2="12" strokeLinecap="round" />
        <line x1="6" y1="15" x2="3" y2="15" strokeLinecap="round" />
        <line x1="18" y1="9" x2="21" y2="9" strokeLinecap="round" />
        <line x1="18" y1="12" x2="21" y2="12" strokeLinecap="round" />
        <line x1="18" y1="15" x2="21" y2="15" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Raspberry Pi",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 2.5a7.5 7.5 0 110 15 7.5 7.5 0 010-15zm0 2A5.5 5.5 0 1012 17 5.5 5.5 0 0012 6.5zm0 2a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm-1 1v1.5H9.5v1H11v1.5H9.5v1H13v-1h-1.5v-1.5H13v-1h-1.5V9.5H11z" />
      </svg>
    ),
  },
  {
    name: "PyTorch",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
        <path d="M12 2C8.5 2 5.6 4.1 4.4 7.1L8 10.7c.4-1.7 1.9-3 3.8-3 2.2 0 3.9 1.7 3.9 3.9S14 15.5 11.8 15.5c-1.7 0-3.1-1.1-3.7-2.6L4.3 16.7C5.7 19.8 8.6 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm2.5 3.5a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  },
  {
    name: "OpenCV",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width="17" height="17" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="6.1" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="17.9" cy="15.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "TensorFlow",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
        <path d="M2 7.5v9l5 2.88V12l8 4.62V9.5L7 6.62V9.5L2 7.5zm20 0L15 4.62V7.5l-5-2.88v7.13L22 16.5V7.5z" />
      </svg>
    ),
  },
  {
    name: "YOLO",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" width="17" height="17" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
        <line x1="12" y1="3" x2="12" y2="6" strokeLinecap="round" />
        <line x1="12" y1="18" x2="12" y2="21" strokeLinecap="round" />
        <line x1="3" y1="12" x2="6" y2="12" strokeLinecap="round" />
        <line x1="18" y1="12" x2="21" y2="12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Git",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.608-.406-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
      </svg>
    ),
  },
  {
    name: "C / C++",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="17" height="17" aria-hidden="true">
        <path d="M7 6L3 10l4 4M11 6l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="8" x2="16" y2="16" strokeLinecap="round" />
        <line x1="13" y1="12" x2="19" y2="12" strokeLinecap="round" />
        <line x1="21" y1="10" x2="21" y2="14" strokeLinecap="round" />
        <line x1="19" y1="10.5" x2="23" y2="10.5" strokeLinecap="round" />
        <line x1="19" y1="13.5" x2="23" y2="13.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function TechTicker() {
  const items = [...TECHS, ...TECHS]; // duplicate for seamless loop

  return (
    <div
      className="relative overflow-hidden border-t border-b"
      style={{
        background: "#020202",
        borderColor: "rgba(255,255,255,0.05)",
        paddingTop: "1.1rem",
        paddingBottom: "1.1rem",
      }}
    >
      {/* Left fade mask */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: "8rem",
          background: "linear-gradient(to right, #020202 0%, transparent 100%)",
        }}
      />
      {/* Right fade mask */}
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: "8rem",
          background: "linear-gradient(to left, #020202 0%, transparent 100%)",
        }}
      />

      {/* Scrolling track */}
      <div className="animate-marquee">
        {items.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 mx-10 select-none"
            style={{ color: "rgba(255,255,255,0.72)", flexShrink: 0 }}
          >
            <span style={{ color: "rgba(255,255,255,0.65)" }}>{tech.icon}</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {tech.name}
            </span>
            {/* Separator dot */}
            <span
              className="ml-8"
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "rgba(53,105,226,0.5)",
                flexShrink: 0,
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
