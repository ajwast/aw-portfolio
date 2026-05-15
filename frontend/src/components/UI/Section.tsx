import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export function Section({ children, className = "" }: SectionProps) {
  return (
    <section 
      className={`bg-gray-900 text-blue-50 font-jost p-6 md:p-10 mb-6 bg-opacity-95 shadow-inner ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}
