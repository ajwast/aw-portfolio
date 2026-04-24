import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="p-6 text-blue-50 border-b-2 bg-gray-950 flex justify-between align-bottom">
      <div className="text-4xl font-semibold tracking-wider">
        Alex Wastnidge
      </div>
      <nav className="flex gap-3">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/blog"}>Blog</Link>
      </nav>
    </header>
  );
}
