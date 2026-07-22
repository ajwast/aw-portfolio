import { Link } from "react-router-dom";
import { NavButton } from "./UI/NavButton";

export function Header() {
  return (
    <header className="p-6 text-blue-50 border-b-2 bg-gray-900 flex justify-between align-bottom">
      <div className="text-4xl font-semibold tracking-wider opacity-90 font-jost">
        <Link to={"/"}>Alex Wastnidge</Link>
      </div>
      <nav className="flex gap-3">
        <NavButton url="/" label="Home" />
        <NavButton url="/about" label="About" />
        <NavButton url="/projects" label="Projects" />
        {/* <NavButton url="/blog" label="Blog" /> */}
      </nav>
    </header>
  );
}
