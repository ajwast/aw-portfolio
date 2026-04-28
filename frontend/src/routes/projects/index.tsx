import { useEffect, useState } from "react";
import { ProjectCard } from "../../components/ProjectCard";

interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
}

export function Projects() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function getProjects() {
      if (!projects.length) {
        console.log("fetching...");
        const res = await fetch("http://localhost:3001/api/projects");
        const data = await res.json();
        console.log(data);
        setProjects(data);
        return;
      } else {
        return;
      }
    }
    getProjects();
  }, []);
  return (
    <div className="w-full max-w-7xl">
      <h1 className="text-4xl font-jost tracking-wider opacity-90 text-blue-50 bg-gray-900 mt-3 mb-4 animate-fade-in-up p-3">
        Projects
      </h1>
      <div className="flex flex-wrap flex-row gap-8 justify-center">
        {projects.map((proj: Project, index: number) => (
          <div
            key={proj.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }} // Staggers the start time
          >
            <ProjectCard project={proj} />
          </div>
        ))}
      </div>
    </div>
  );
}
