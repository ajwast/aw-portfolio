import { Link } from "react-router-dom";

interface ButtonProps {
  url: string;
  label: string;
}

export function LinkButton({ url, label }: ButtonProps) {
  return (
    <Link
      className="bg-blue-50 text-jost font-semibold hover:bg-black hover:text-blue-50 hover:scale-110 duration-100 text-black px-4 py-2 opacity-80"
      to={url}
    >
      {label}
    </Link>
  );
}
