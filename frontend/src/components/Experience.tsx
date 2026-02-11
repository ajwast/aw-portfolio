import styles from "./Experience.module.css";
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { useEffect } from 'react';

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
    <section className={styles.section} id="experience">
      <h2 className={`${styles.heading} animate-on-scroll`}>Education & Experience</h2>

      <div className={`${styles.timeline} animate-on-scroll`}>
        {experienceData.map((item, index) => (
          <div 
            key={index} 
            className={`${styles.item} animate-on-scroll`}
            style={{ transitionDelay: `${0.1 * index}s` }}
          >
            <div 
              className={`${styles.period} animate-on-scroll`} 
              style={{ transitionDelay: `${0.1 * index + 0.1}s` }}
            >
              {item.period}
            </div>

            <div className={`${styles.content} animate-on-scroll`} style={{ transitionDelay: `${0.1 * index + 0.2}s` }}>
              <h3 
                className={`${styles.title} animate-on-scroll`} 
                style={{ transitionDelay: `${0.1 * index + 0.3}s` }}
              >
                {item.title}
              </h3>

              <p 
                className={`${styles.org} animate-on-scroll`} 
                style={{ transitionDelay: `${0.1 * index + 0.4}s` }}
              >
                {item.organisation}
              </p>

              <p 
                className={`${styles.desc} animate-on-scroll`} 
                style={{ transitionDelay: `${0.1 * index + 0.5}s` }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
