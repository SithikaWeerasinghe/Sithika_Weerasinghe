import React from "react";
import { Container } from "@/components/ui/Container";

export function Projects() {
  const projects = [
    { title: "Project Alpha", category: "Web Development", description: "A cinematic real estate platform built with Next.js and Tailwind." },
    { title: "Project Beta", category: "Creative Coding", description: "Interactive 3D visualization using Three.js and React." },
    { title: "Project Gamma", category: "Systems Design", description: "High-performance API engine optimized for low-latency." },
  ];

  return (
    <section id="projects" className="section-padding bg-black/20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>Featured Work</h2>
            <p className="text-xl text-muted leading-relaxed" style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>
              A selection of projects that showcase my commitment to quality and technical innovation.
            </p>
          </div>
          <a href="#" className="text-brand font-medium hover:underline flex items-center gap-2" style={{ fontFamily: "var(--font-sans)" }}>
            View all projects
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="group glass p-8 rounded-2xl card-hover">
              <p className="text-xs font-mono text-brand mb-4 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>{project.category}</p>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>{project.title}</h3>
              <p className="text-muted mb-8" style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>{project.description}</p>
              <div className="pt-4 border-t border-white/[0.05] group-hover:border-brand/20 transition-colors">
                <span className="text-sm font-medium opacity-50 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "var(--font-sans)" }}>Explore Project →</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
