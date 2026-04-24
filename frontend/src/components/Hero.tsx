import profileImage from "../assets/profile.jpg";
import { LinkButton } from "./UI/LinkButton.tsx";

export function Hero() {
  return (
    <div className="flex flex-col flex-wrap text-blue-50 m-auto mt-7 justify-center w-200">
      <div className="flex flex-wrap">
        <h1 className="font-bold text-transparent [-webkit-text-stroke:2px_black] text-6xl p-2 m-auto font-mono">
          ALEX WASTNIDGE
        </h1>
        <img
          src={profileImage}
          alt=""
          className="rounded-full max-h-50 max-w-50 p-2 m-auto mb-2"
        />
      </div>
      <p className="border-b m-auto text-2xl font-rubik text-black">
        Creative Technologist · Music · AI · Web Development
      </p>

      <p className="m-auto p-2 text-xl font-rubik">
        I design and build experimental tools that blend sound, code, and human
        creativity.
      </p>
      <div className="flex justify-between p-5 w-100 m-auto">
        <LinkButton label="About Me" url="/about" />
        <LinkButton label="Contact" url="/contact" />
        <LinkButton label="Projects" url="/projects" />
      </div>
    </div>
  );
}
