import styles from "./Skills.module.css";

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
    title: "Frameworks & Tools",
    skills: [
      "React",
      "Node.js",
      "Torch/PyTorch",
      "JUCE",
      "OpenFrameworks",
      "Vite",
      "Git",
    ],
  },
  {
    title: "Audio & ML",
    skills: ["DSP", "MIDI", "Neural Networks", "MIR", "Audio Analysis"],
  },
  {
    title: "Systems",
    skills: ["Linux", "Realtime Audio", "Plugin Dev", "REST APIs"],
  },
];

function Skills() {
  return (
    <section className={styles.section} id="skills">
      <h2 className={styles.heading}>Skills</h2>

      <div className={styles.groups}>
        {skillGroups.map((group) => (
          <div key={group.title} className={styles.group}>
            <h3>{group.title}</h3>

            <div className={styles.list}>
              {group.skills.map((skill) => (
                <span key={skill} className={styles.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
