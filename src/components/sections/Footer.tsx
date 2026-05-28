import React from "react";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-white/[0.02]">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted">
        <div style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>
          <p>© {currentYear} Sithika Weerasinghe. Built with Next.js.</p>
        </div>
        <div className="flex gap-8" style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", letterSpacing: "0.05em", uppercase: "true" } as any}>
          <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
        </div>
      </Container>
    </footer>
  );
}
