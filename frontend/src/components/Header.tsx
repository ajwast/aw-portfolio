import styles from "./Header.module.css";

type HeaderProps = {
  name: string;
  title: string;
  onSkillsClick: () => void;
  onExpClick: () => void;
  onAboutClick: () => void;
  onProjectsClick: () => void;
  onContactClick: () => void;
  activeSection: string | null;
};

function Header({
  name,
  title,
  onSkillsClick,
  onExpClick,
  onAboutClick,
  onProjectsClick,
  onContactClick,
  activeSection,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.title}>{title}</p>
        </div>

        <nav className={styles.nav}>
          <button
            className={`${styles.navButton} ${activeSection === "about" ? styles.active : ""}`}
            onClick={onAboutClick}
            aria-current={activeSection === "about" ? "page" : undefined}
          >
            About
          </button>

          <button
            className={`${styles.navButton} ${activeSection === "skills" ? styles.active : ""}`}
            onClick={onSkillsClick}
            aria-current={activeSection === "skills" ? "page" : undefined}
          >
            Skills
          </button>

          <button
            className={`${styles.navButton} ${activeSection === "experience" ? styles.active : ""}`}
            onClick={onExpClick}
            aria-current={activeSection === "experience" ? "page" : undefined}
          >
            Experience
          </button>

          <button
            className={`${styles.navButton} ${activeSection === "projects" ? styles.active : ""}`}
            onClick={onProjectsClick}
            aria-current={activeSection === "projects" ? "page" : undefined}
          >
            Projects
          </button>

          <button
            className={`${styles.navButton} ${activeSection === "contact" ? styles.active : ""}`}
            onClick={onContactClick}
            aria-current={activeSection === "contact" ? "page" : undefined}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
