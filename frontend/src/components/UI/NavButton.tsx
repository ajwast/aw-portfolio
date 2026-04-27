import { Link } from "react-router-dom";

interface ButtonProps {
  url: string;
  label: string;
}

export function NavButton({ url, label }: ButtonProps) {
  return (
    <Link
      className="text-blue-50 border-b-2 hover:bg-blue-50 hover:text-gray-950 border-b-gray-900 hover:scale-110 hover:font-semibold duration-100 px-4 py-2 opacity-70 text-jost"
      to={url}
    >
      {label}
    </Link>
  );
}
