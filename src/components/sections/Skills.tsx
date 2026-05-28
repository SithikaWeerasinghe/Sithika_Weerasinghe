import React from "react";
import { Container } from "@/components/ui/Container";

export function Skills() {
  const skillGroups = [
    { title: "Languages", skills: ["TypeScript", "JavaScript", "Python", "Java", "C++"] },
    { title: "Frontend", skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
    { title: "Backend", skills: ["Node.js", "Express", "Supabase", "PostgreSQL"] },
    { title: "Tools", skills: ["Git", "Docker", "VS Code", "Vercel"] },
  ];

  return (
    <section id="skills" className="section-padding border-t border-white/[0.02]">
      <Container>
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>Technical Proficiency</h2>
          <p className="text-xl text-muted" style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}>
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {skillGroups.map((group, i) => (
            <div key={i}>
              <h3 className="text-brand font-mono text-xs tracking-widest uppercase mb-6" style={{ fontFamily: "var(--font-mono)" }}>{group.title}</h3>
              <ul className="space-y-4">
                {group.skills.map((skill, j) => (
                  <li key={j} className="text-lg font-medium border-l-2 border-white/5 pl-4 hover:border-brand/40 transition-colors" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
