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
    <div className=" text-blue-50 bg-gray-900 font-jost p-3 opacity-90 mb-3">
      <h2 className="text-3xl font-jost tracking-wider mt-3 mb-4 animate-fade-in-up border-b">
        SKILLS
      </h2>

      <div className="flex flex-wrap gap-1 justify-evenly">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="bg-blue-50 text-gray-900 flex flex-col items-center text-center border m-w-80 max-h-102 p-6 shadow-md rounded-sm"
          >
            <h3 className="text-xl font-semibold border-b mb-2">
              {group.title}
            </h3>

            <div className="flex flex-col flex-wrap h-50">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-900 text-blue-50 m-1 px-2 py-1 rounded-2xl hover:scale-105"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
