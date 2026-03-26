import React from "react";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#020202]">
      {/* Premium Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main Brand Glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand/10 blur-[150px] rounded-full mix-blend-screen opacity-60" />
        
        {/* Subtle Secondary Glow */}
        <div className="absolute bottom-[0%] right-[0%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full mix-blend-overlay" />
        
        {/* Noise Overlay for Film Grain feel */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
        
        {/* Light Beam Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b-custom from-brand/50 to-transparent opacity-20" />
      </div>
      
      <Container className="relative z-10">
        <div className="max-w-5xl">
          {/* Tagline / status */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md mb-10 animate-fade-in">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
             </span>
             <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/60">Creative Technologist — 2026</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold tracking-tight leading-[0.85] mb-12 animate-fade-in-up">
            <span className="block text-gradient">Engineering</span>
            <span className="block italic font-light opacity-30 tracking-tighter ml-4 md:ml-12">Precision.</span>
            <span className="block text-gradient mt-2">Designing Impact.</span>
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <p className="text-xl md:text-2xl text-muted leading-relaxed font-light animate-fade-in delay-200">
                <span className="text-white font-medium">Lithira Kalubowila</span> is a Computer Science undergraduate crafting high-performance digital experiences through the lens of technical rigor and creative intuition.
              </p>
            </div>
            
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 animate-fade-in delay-300">
              <a 
                href="#projects" 
                className="group relative flex-1 h-16 flex items-center justify-center bg-white text-black font-bold rounded-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand/0 via-brand/10 to-brand/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </a>
              <a 
                href="#contact" 
                className="group relative flex-1 h-16 flex items-center justify-center border border-white/10 glass rounded-xl overflow-hidden transition-all hover:border-white/20 active:scale-[0.98]"
              >
                <span className="font-bold">Contact</span>
                <span className="ml-2 opacity-40 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
      
      {/* Minimal Footer Detail */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-7xl px-8 flex justify-between items-center opacity-20 text-[10px] font-mono tracking-widest uppercase pointer-events-none">
        <div className="flex gap-4">
          <span>06.924N</span>
          <span>79.861E</span>
        </div>
        <div className="h-[1px] flex-1 mx-8 bg-gradient-to-r-custom from-transparent via-white/50 to-transparent" />
        <span>SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
}
