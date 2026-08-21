import profileImage from "../assets/profile.jpg";
import { LinkButton } from "./UI/LinkButton.tsx";

export function Hero() {
  return (
    <div className="flex flex-col text-blue-50 my-auto p-8 justify-center items-center max-w-4xl text-center animate-fade-in-up">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <h1 className="font-bold text-transparent [-webkit-text-stroke:2px_black] text-6xl lg:text-6xl font-jost">
          ALEX WASTNIDGE
        </h1>
        <img
          src={profileImage}
          alt="Alex Wastnidge"
          className="rounded-full h-48 w-48 object-cover border-4 border-blue-50/20 shadow-xl opacity-90"
        />
      </div>

      <p className="border-b-2 border-black/20 font-bold text-2xl lg:text-3xl font-jost text-black opacity-80 pb-2 mb-4">
        Software Development · Music Technology · AI Creativity
      </p>

      <p className="max-w-2xl text-xl font-semibold font-jost opacity-90 mb-8">
        I design and build tools that blend sound, code, and human creativity.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        <LinkButton label="About Me" url="/about" />
        <LinkButton label="Contact" url="/contact" />
        <LinkButton label="Projects" url="/projects" />
      </div>
    </div>
  );
}
