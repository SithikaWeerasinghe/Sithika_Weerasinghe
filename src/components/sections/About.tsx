import React from "react";
import { Container } from "@/components/ui/Container";

export function About() {
  return (
    <section id="about" className="section-padding border-t border-white/[0.02]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">
              Blending code <br /> with <span className="text-brand">creativity.</span>
            </h2>
            <div className="space-y-6 text-lg text-muted">
              <p>
                As a Computer Science undergraduate, I'm driven by the intersection of complex 
                logic and beautiful aesthetics. I don't just write code; I craft experiences 
                that feel alive and purposeful.
              </p>
              <p>
                My approach is rooted in technical excellence and a deep appreciation for 
                minimal design. Whether it's developing scalable backend systems or 
                crafting fluid user interfaces, I focus on the small details that make 
                big impacts.
              </p>
            </div>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 glass rounded-2xl overflow-hidden">
               {/* Placeholder for an image or decorative element */}
               <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-800 font-bold text-4xl">
                 LK
               </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
