"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-x-0 border-t-0">
      <Container className="flex items-center justify-between h-20">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          LK<span className="text-brand">.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted hover:text-foreground transition-colors">
          <Link href="#about" className="hover:text-foreground">About</Link>
          <Link href="#projects" className="hover:text-foreground">Projects</Link>
          <Link href="#skills" className="hover:text-foreground">Skills</Link>
          <Link href="#contact" className="hover:text-foreground">Contact</Link>
        </nav>
        <Link 
          href="#contact" 
          className="px-5 py-2 rounded-full glass text-sm font-medium hover:bg-white/5 transition-colors"
        >
          Let's talk
        </Link>
      </Container>
    </header>
  );
}
