import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TechTicker } from "@/components/sections/TechTicker";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
// Archived until real client testimonials are ready — restore by uncommenting
// this import and the <Testimonials /> usage below. Component file is kept intact.
// import { Testimonials } from "@/components/sections/Testimonials";
import { Certification } from "@/components/sections/Certification";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
<TechTicker />
      <Projects />
      {/* <Testimonials /> — archived until real client testimonials are ready */}
      <Certification />
      <Contact />
    </main>
  );
}
