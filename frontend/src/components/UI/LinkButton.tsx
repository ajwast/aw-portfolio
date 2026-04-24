import { Link } from "react-router-dom";

interface ButtonProps {
  url: string;
  label: string;
}

export function LinkButton({ url, label }: ButtonProps) {
  return (
    <Link
      className="bg-blue-50 hover:bg-black hover:text-blue-50 hover:scale-110 duration-100 text-black rounded-lg px-4 py-2 opacity-70"
      to={url}
    >
      {label}
    </Link>
  );
}
