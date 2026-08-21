import { Link } from "react-router-dom";
import { NavButton } from "./UI/NavButton";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx"; // Added RxCross2 for a close icon
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="p-6 text-blue-50 border-b-2 bg-gray-900 relative">
      <div className="flex justify-between items-center">
        <div className="text-4xl font-semibold tracking-wider opacity-90 font-jost">
          <Link to={"/"} onClick={closeMenu}>
            Alex Wastnidge
          </Link>
        </div>

        {/* Desktop nav layout */}
        <nav className="hidden sm:flex gap-4">
          <NavButton url="/" label="Home" />
          <NavButton url="/about" label="About" />
          <NavButton url="/projects" label="Projects" />
          <NavButton url="/blog" label="Blog" />
          <NavButton url="/contact" label="Contact" />
        </nav>

        {/* Mobile hamburger nav button */}
        <div className="text-2xl sm:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none transition-transform"
            aria-label="Toggle Menu"
          >
            {isOpen ? <RxCross2 /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile hamburger nav menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 flex flex-col sm:hidden border-b-2 z-50">
          <Link
            to="/"
            onClick={closeMenu}
            className="p-4 border-b border-gray-700 hover:bg-gray-700"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="p-4 border-b border-gray-700 hover:bg-gray-700"
          >
            About
          </Link>
          <Link
            to="/projects"
            onClick={closeMenu}
            className="p-4 border-b border-gray-700 hover:bg-gray-700"
          >
            Projects
          </Link>
          <Link
            to="/blog"
            onClick={closeMenu}
            className="p-4 border-b border-gray-700 hover:bg-gray-700"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="p-4 hover:bg-gray-700"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
