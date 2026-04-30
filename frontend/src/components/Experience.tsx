type ExperienceItem = {
  period: string;
  title: string;
  organisation: string;
  description: string;
};

const experienceData: ExperienceItem[] = [
  {
    period: "2024 - Present",
    title: "Backend Development",
    organisation: "Noroff University College of Technology",
    description: "Qualification covering full-stack web development",
  },
  {
    period: "2024 - Present",
    title: "Creative Technologist / Developer",
    organisation: "Freelance / Personal Projects",
    description:
      "Developing AI-driven music tools, DAW plugins, audiovisual systems, and experimental interfaces.",
  },
  {
    period: "2022 - 2024",
    title: "MPhil in Music, Communication & Technology",
    organisation: "University of Oslo",
    description:
      "Research focused on music information retrieval, machine learning, and interactive music systems.",
  },
  {
    period: "2015 - 2020",
    title: "Lecturer in Music Technology",
    organisation: "North East Surrey College of Technology",
    description:
      "Lecturer in Music Technology across Higher Education, Further Education & Entry Level qualifications",
  },
];

export function Experience() {
  return (
    <div className="font-jost bg-gray-900 text-blue-50 p-3 opacity-90">
      <h2 className="text-3xl font-jost tracking-wider mt-3 mb-4 animate-fade-in-up border-b">
        EXPERIENCE & EDUCATION
      </h2>

      <div className="flex flex-col justify-center items-center">
        {experienceData.map((item, index) => (
          <div
            key={index}
            className=" bg-blue-50 text-gray-900 mb-5 rounded-2xl p-5 mx-2 w-1/2"
          >
            <div className="italic text-xs">{item.period}</div>

            <div className="">
              <h3 className="text-xl font-semibold border-b">{item.title}</h3>

              <p className="font-semibold mb-3">{item.organisation}</p>

              <p className="">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
