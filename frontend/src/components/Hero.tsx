import styles from "./Hero.module.css";
import profileImage from "../assets/profile.jpg";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.name}>Alex Wastnidge</h1>
        <img
          src={profileImage}
          alt="Alex Wastnidge"
          className={styles.avatar}
        />
        <p className={styles.tagline}>
          Creative Technologist · Music · AI · Interactive Systems
        </p>

        <p className={styles.description}>
          I design and build experimental tools that blend sound, code, and
          human creativity.
        </p>

        <div className={styles.actions}>
          <a href="#projects" className={styles.primary}>
            View Projects
          </a>

          <a href="#contact" className={styles.secondary}>
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
