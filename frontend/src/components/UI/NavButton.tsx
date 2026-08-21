import { Link } from "react-router-dom";

interface ButtonProps {
  url: string;
  label: string;
}

export function NavButton({ url, label }: ButtonProps) {
  return (
    <Link
      className="text-blue-50/70 hover:text-blue-50 font-medium tracking-wide transition-all duration-300 relative group py-1 px-3"
      to={url}
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-50 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}
