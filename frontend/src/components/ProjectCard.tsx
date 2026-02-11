import styles from "./ProjectCard.module.css";
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { useEffect } from 'react';

type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
};

type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
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
    <article className={`${styles.card} animate-on-scroll`}>
      <img 
        src={project.image} 
        alt={project.title} 
        className={`${styles.image} animate-on-scroll`}
        style={{ transitionDelay: '0.1s' }}
      />

      <h3 className={`${styles.title} animate-on-scroll`} style={{ transitionDelay: '0.2s' }}>
        {project.title}
      </h3>
      <p className={`animate-on-scroll`} style={{ transitionDelay: '0.3s' }}>
        {project.description}
      </p>

      <a
        className={`${styles.link} animate-on-scroll`}
        href={project.link}
        target="_blank"
        rel="noreferrer"
        style={{ transitionDelay: '0.4s' }}
      >
        View Project
      </a>
    </article>
  );
}

export default ProjectCard;
