import { Section } from "./UI/Section";
import { SectionHeading } from "./UI/SectionHeading";

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
    <Section>
      <SectionHeading>EXPERIENCE & EDUCATION</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experienceData.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors duration-300 group"
          >
            <div className="text-rose-400 text-sm font-medium mb-2 opacity-80 group-hover:opacity-100">
              {item.period}
            </div>

            <div className="">
              <h3 className="text-xl font-bold text-white mb-1">
                {item.title}
              </h3>

              <p className="text-rose-200/80 font-semibold mb-3">
                {item.organisation}
              </p>

              <p className="text-white/60 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
