import styles from "./Hero.module.css";
import profileImage from "../assets/profile.jpg";
import { useScrollAnimation } from '../utils/useScrollAnimation';
import { useEffect } from 'react';

function Hero() {
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
    <section className={styles.hero} aria-label="Hero section">
      <div className={styles.inner}>
        <h1 
          className={`${styles.name} animate-on-scroll`} 
          style={{ transitionDelay: '0.1s' }}
          tabIndex={-1}
        >
          Alex Wastnidge
        </h1>
        <img
          src={profileImage}
          alt="Alex Wastnidge"
          className={`${styles.avatar} animate-on-scroll`}
          style={{ transitionDelay: '0.2s' }}
        />
        <p className={`${styles.tagline} animate-on-scroll`} style={{ transitionDelay: '0.3s' }}>
          Creative Technologist · Music · AI · Interactive Systems
        </p>

        <p className={`${styles.description} animate-on-scroll`} style={{ transitionDelay: '0.4s' }}>
          I design and build experimental tools that blend sound, code, and
          human creativity.
        </p>

        <div className={`${styles.actions} animate-on-scroll`} style={{ transitionDelay: '0.5s' }}>
          <a href="#projects" className="btn-primary" aria-label="Navigate to projects section">
            View Projects
          </a>

          <a href="#contact" className="btn-secondary" aria-label="Navigate to contact section">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
