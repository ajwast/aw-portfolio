import styles from "./Experience.module.css";

type ExperienceItem = {
  period: string;
  title: string;
  organisation: string;
  description: string;
};

const experienceData: ExperienceItem[] = [
  {
    period: "2021 – 2025",
    title: "PhD Researcher (Music Technology)",
    organisation: "University Name",
    description:
      "Research on AI-assisted electronic music production, 4E cognition, and creative tools for composers and performers.",
  },
  {
    period: "2020 – 2021",
    title: "MSc / MA in Music Technology",
    organisation: "University Name",
    description:
      "Focused on digital signal processing, machine learning, and interactive audio systems.",
  },
  {
    period: "2016 – 2020",
    title: "BSc in Computer Science / Music",
    organisation: "University Name",
    description:
      "Studied software engineering, audio programming, and creative computing.",
  },
  {
    period: "2023 – Present",
    title: "Creative Technologist / Developer",
    organisation: "Freelance / Personal Projects",
    description:
      "Developing AI-driven music tools, DAW plugins, audiovisual systems, and experimental interfaces.",
  },
];

function Experience() {
  return (
    <section className={styles.section} id="experience">
      <h2 className={styles.heading}>Education & Experience</h2>

      <div className={styles.timeline}>
        {experienceData.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.period}>{item.period}</div>

            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>

              <p className={styles.org}>{item.organisation}</p>

              <p className={styles.desc}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
