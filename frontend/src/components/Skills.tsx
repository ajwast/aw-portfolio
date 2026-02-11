import styles from "./Skills.module.css";
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { useEffect } from 'react';

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
  useScrollAnimation();
  
  useEffect(() => {
    // Trigger initial animation check when component mounts
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.classList.add('visible');
      }
    });
  }, []);

  return (
    <section className={styles.section} id="skills">
      <h2 className={`${styles.heading} animate-on-scroll`}>Skills</h2>

      <div className={`${styles.groups} animate-on-scroll`}>
        {skillGroups.map((group, groupIndex) => (
          <div 
            key={group.title} 
            className={`${styles.group} animate-on-scroll`}
            style={{ transitionDelay: `${0.1 * groupIndex}s` }}
          >
            <h3 className="animate-on-scroll" style={{ transitionDelay: `${0.1 * groupIndex + 0.1}s` }}>
              {group.title}
            </h3>

            <div className={`${styles.list} animate-on-scroll`} style={{ transitionDelay: `${0.1 * groupIndex + 0.2}s` }}>
              {group.skills.map((skill, skillIndex) => (
                <span 
                  key={skill} 
                  className={`${styles.skill} animate-on-scroll`}
                  style={{ transitionDelay: `${0.1 * groupIndex + 0.3 + (skillIndex * 0.02)}s` }}
                >
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
