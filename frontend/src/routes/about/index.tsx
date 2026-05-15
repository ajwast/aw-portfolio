import { About } from "../../components/About";
import { Experience } from "../../components/Experience";
import { Skills } from "../../components/Skills";

export function AboutSection() {
  return (
    <div className="w-full max-w-7xl px-4 md:px-8 animate-fade-in-up font-jost py-8">
      <div className="mb-8"></div>
      <About />
      <Skills />
      <Experience />
    </div>
  );
}
