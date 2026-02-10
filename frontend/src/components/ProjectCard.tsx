import styles from "./ProjectCard.module.css";

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
  return (
    <article className={styles.card}>
      <img src={project.image} alt={project.title} className={styles.image} />

      <h3 className={styles.title}>{project.title}</h3>
      <p>{project.description}</p>

      <a
        className={styles.link}
        href={project.link}
        target="_blank"
        rel="noreferrer"
      >
        View Project
      </a>
    </article>
  );
}

export default ProjectCard;
