import React from "react";
import { Container } from "@/components/ui/Container";

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-brand/5">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-gradient">
            Start a project<span className="text-brand">.</span>
          </h2>
          <p className="text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, creative ideas or 
            opportunities to be part of your visions.
          </p>
          <a 
            href="mailto:contact@lithira.com" 
            className="inline-block px-12 py-5 bg-foreground text-background font-bold text-lg rounded-full hover:bg-white transition-all transform hover:scale-105 active:scale-95"
          >
            Get in touch
          </a>
        </div>
      </Container>
    </section>
  );
}
