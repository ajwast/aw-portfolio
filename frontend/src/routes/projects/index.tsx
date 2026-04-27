import { useEffect, useState } from "react";
import { ProjectCard } from "../../components/ProjectCard";

// import DsApp from "./assets/DS-UI.png";

export function Projects() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function getProjects() {
      const res = await fetch("http://localhost:3001/api/projects");
      const data = await res.json();
      console.log(data);
      setProjects(data);
    }
    getProjects();
  }, []);
  return (
    <div>
      <h1>Projects</h1>
      {projects.map((proj) => (
        <ProjectCard project={proj} key={proj.id} />
      ))}
    </div>
  );
}
