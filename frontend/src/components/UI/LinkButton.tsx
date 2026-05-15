import { Link } from "react-router-dom";

interface ButtonProps {
  url: string;
  label: string;
}

export function LinkButton({ url, label }: ButtonProps) {
  return (
    <Link
      className="inline-block bg-white text-gray-900 font-jost font-bold px-8 py-2.5 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300 active:scale-95 text-center shadow-lg hover:shadow-rose-500/40 w-full md:w-auto uppercase tracking-wider text-sm"
      to={url}
    >
      {label}
    </Link>
  );
}
