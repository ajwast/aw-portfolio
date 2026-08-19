import { Section } from "./UI/Section";
import { SectionHeading } from "./UI/SectionHeading";

type SkillGroup = {
  title: string;
  skills: string[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "C++", "SQL"],
  },
  {
    title: "Web Development",
    skills: [
      "Node.js",
      "React",
      "Server deployment",
      "MySQL",
      "PostgreSQL",
      "Sequelize",
      "REST APIs",
      "ExpressJS",
    ],
  },
  {
    title: "AI/ML",
    skills: [
      "Tensorflow",
      "Torch/PyTorch",
      "Numpy",
      "Pandas",
      "Neural networks",
      "Data processing",
    ],
  },
  {
    title: "Audio/Music",
    skills: [
      "Music Information Retreival (MIR)",
      "Digital Signal Processing(DSP)",
      "JUCE C++ framework",
    ],
  },
];

export function Skills() {
  return (
    <Section>
      <SectionHeading>SKILLS</SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillGroups.map((group) => (
          <div key={group.title} className="flex flex-col">
            <h3 className="text-xl font-bold text-rose-300 mb-4 border-b border-white/10 pb-2 font-jost">
              {group.title}
            </h3>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-800 text-blue-50/90 border border-gray-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-rose-500/20 hover:text-rose-300 transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
