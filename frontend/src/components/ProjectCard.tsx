import { LinkButton } from "./UI/LinkButton";
import DsApp from "../assets/DS-UI.png";
import hyperseq from "../assets/hyperseq.png";
import portfolioBg from "../assets/pinkbg.jpg";

interface Project {
  name: string;
  description: string;
  link: string;
  image: string;
}

const imageMap: Record<string, string> = {
  "Deep Steps": DsApp,
  hyperseq: hyperseq,
  Portfolio: portfolioBg,
};

export function ProjectCard({ project }: { project: Project }) {
  const projectImage = imageMap[project.name] || project.image;

  return (
    <div className="bg-gray-900 border border-gray-800 flex flex-col p-6 rounded-2xl hover:border-gray-700 transition-all duration-300 group shadow-lg h-full">
      <div className="relative h-48 w-full overflow-hidden rounded-xl mb-6 bg-gray-800">
        <img
          src={projectImage}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-rose-400 transition-colors duration-300">
        {project.name}
      </h3>

      <p className="text-blue-50/80 text-sm leading-relaxed mb-6 flex-grow">
        {project.description}
      </p>

      <div className="mt-auto pt-4 border-t border-gray-800">
        <LinkButton url={project.link} label="View Project" />
      </div>
    </div>
  );
}
