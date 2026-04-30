import { About } from "../../components/About";
import { Experience } from "../../components/Experience";
import { Skills } from "../../components/Skills";

export function AboutSection() {
  return (
    <div className="w-2/3 max-w-7xl animate-fade-in-up font-jost">
      <h1 className="text-4xl font-bold text-blue-50 bg-gray-900 mt-3 mb-4 p-3 opacity-90 tracking-wider">
        ALEX WASTNIDGE
      </h1>
      <About />
      <Skills />
      <Experience />
    </div>
  );
}
