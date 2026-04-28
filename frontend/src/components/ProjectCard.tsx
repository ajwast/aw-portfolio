import { LinkButton } from "./UI/LinkButton";
import DsApp from "../assets/DS-UI.png";
// import DsDaw from "./assets/DS-DAW.png";
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
  return (
    <div className="bg-blue-50 flex flex-col items-center text-center border w-80 h-110 p-6 shadow-md hover:shadow-2xl hover:border-2 hover:scale-103 duration-150 rounded-sm opacity-85">
      <h1 className="text-xl font-bold font-jost mb-4">{project.name}</h1>
      <div className="h-40 w-full flex justify-center items-center mb-4">
        <img
          src={imageMap[project.name]}
          alt={project.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <p className="font-jost text-gray-800 mb-3 flex-grow">
        {project.description}
      </p>
      <div className="mt-auto">
        <LinkButton url={project.link} label="View project" />
      </div>
    </div>
  );
}
