import { LinkButton } from "./UI/LinkButton";

interface Project {
  name: string;
  description: string;
  link: string;
  image: string;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-blue-50 text-jost border">
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <LinkButton url={project.link} label="View project" />
    </div>
  );
}
