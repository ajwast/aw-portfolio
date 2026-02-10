import styles from "./Header.module.css";

type HeaderProps = {
  name: string;
  title: string;
  onSkillsClick: () => void;
  onExpClick: () => void;
  onAboutClick: () => void;
  onProjectsClick: () => void;
  onContactClick: () => void;
};

function Header({
  name,
  title,
  onSkillsClick,
  onExpClick,
  onAboutClick,
  onProjectsClick,
  onContactClick,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.title}>{title}</p>
        </div>

        <nav className={styles.nav}>
          <button className={styles.navButton} onClick={onSkillsClick}>
            Skills
          </button>

          <button className={styles.navButton} onClick={onExpClick}>
            Experience
          </button>

          <button className={styles.navButton} onClick={onAboutClick}>
            About
          </button>

          <button className={styles.navButton} onClick={onProjectsClick}>
            Projects
          </button>

          <button className={styles.navButton} onClick={onContactClick}>
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
