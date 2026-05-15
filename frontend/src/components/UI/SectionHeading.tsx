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
      className={`text-3xl md:text-4xl font-jost tracking-wider mt-2 mb-8 animate-fade-in-up border-b bg-gray-900 p-3  pb-2 ${className}`}
    >
      {children}
    </h2>
  );
}
