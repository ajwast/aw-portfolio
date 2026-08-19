interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`text-3xl md:text-4xl font-bold text-white font-jost tracking-wide mt-2 mb-8 animate-fade-in-up border-b border-white/10 pb-3 ${className}`}
    >
      {children}
    </h2>
  );
}
