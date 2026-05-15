import { useEffect, useState } from "react";
import { ProjectCard } from "../../components/ProjectCard";
import { Section } from "../../components/UI/Section";
import { SectionHeading } from "../../components/UI/SectionHeading";

interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProjects() {
      try {
        const res = await fetch("http://localhost:3001/api/projects");
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    getProjects();
  }, []);

  return (
    <div className="w-full max-w-7xl px-4 py-8">
      <Section className="bg-transparent shadow-none p-0 md:p-0 mb-0">
        <SectionHeading>PROJECTS</SectionHeading>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-rose-400/50 animate-pulse text-xl">Loading amazing things...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, index) => (
              <div
                key={proj.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProjectCard project={proj} />
              </div>
            ))}
          </div>
        )}
        
        {!isLoading && projects.length === 0 && (
          <div className="text-center py-20 text-blue-50/40 italic">
            No projects found. Check back soon!
          </div>
        )}
      </Section>
    </div>
  );
}
