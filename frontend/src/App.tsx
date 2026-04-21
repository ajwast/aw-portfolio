import "./App.css";
import { useState, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import ProjectCard from "./components/ProjectCard";
import ContactForm from "./components/Contact";
import ScrollIndicator from "./components/ScrollIndicator";
import { useScrollToSection } from "./utils/useScrollToSection";
import { useScrollAnimation } from "./utils/useScrollAnimation";
import { useEffect } from "react";

import DsApp from "./assets/DS-UI.png";
// import DsDaw from "./assets/DS-DAW.png";
import hyperseq from "./assets/hyperseq.png";
import profile from "./assets/profile.jpg";

type Project = {
  title: string;
  description: string;
  link: string;
  image: string;
};

function App() {
  const [showAbout, setShowAbout] = useState<boolean>(true);
  const [apiMessage, setApiMessage] = useState<string>("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch(console.error);
  }, []);

  const aboutRef = useRef<HTMLElement | null>(null);
  const skillsRef = useRef<HTMLElement | null>(null);
  const expRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const [scrollToSection, activeSection] = useScrollToSection();
  useScrollAnimation();

  const [projects] = useState<Project[]>([
    {
      title: "Deep Steps",
      description:
        "A stand alone MIDI step sequencer application with an integrated, user-trainable generative neural network.",
      link: "https://github.com/ajwast/DeepSteps",
      image: DsApp,
    },
    {
      title: "Full-Stack Portfolio & Blog Web App",
      description:
        "This portfolio and blog deployment  uses a full tech stack of React/Vite + Typescript in the frontend and Node, Express and PostgreSQL in the backend ",
      link: "https://example.com",
      image: profile,
    },
    // {
    //   title: "Deep Steps JUCE Plugin",
    //   description:
    //     "Deep Steps AI sequencer plugin for your DAW. Made with the JUCE C++ framework",
    //   link: "https://example.com",
    //   image: DsDaw,
    // },
    {
      title: "HyperSeq",
      description:
        "An experimental prototyping project in using neural network architectures for generative MIDI sequencing on an embedded platform. Made using Python and Pytorch",
      link: "https://github.com/ajwast/hyperSeq",
      image: hyperseq,
    },
  ]);

  return (
    <div>
      <ScrollIndicator />
      <Header
        name="Alex Wastnidge"
        title="Creative Technologist / Developer"
        onSkillsClick={() => scrollToSection(skillsRef)}
        onExpClick={() => scrollToSection(expRef)}
        onAboutClick={() => scrollToSection(aboutRef)}
        onProjectsClick={() => scrollToSection(projectsRef)}
        onContactClick={() => scrollToSection(contactRef)}
        activeSection={activeSection}
      />

      <main role="main">
        <p>API says: {apiMessage}</p>
        <Hero />

        {/* About toggle */}
        <button
          className="btn-secondary animate-on-scroll"
          aria-expanded={showAbout}
          aria-controls="about"
          onClick={() => setShowAbout(!showAbout)}
          style={{ transitionDelay: "0.1s" }}
        >
          {showAbout ? "Hide" : "Show"} About
        </button>

        {showAbout && (
          <section
            ref={aboutRef}
            id="about"
            tabIndex={-1}
            className="animate-on-scroll"
            aria-labelledby="about-heading"
          >
            <h2
              id="about-heading"
              className="animate-on-scroll"
              style={{ transitionDelay: "0.2s" }}
            >
              About Me
            </h2>
            <p
              className="animate-on-scroll"
              style={{ transitionDelay: "0.3s" }}
            >
              I'm a developer and creative technologist working with music,
              code, and interactive systems. I have a background in Music
              Production, Audio Engineering, Audio Programming and Education. I
              developed "Deep Steps", a MIDI step sequencer with an integrated
              user-trainable generative neural network. Deep Steps was presented
              at The International Conference on AI and Musical Creativity 2024.
              This work covered AI in Music, Human-Computer Interaction,
              Human-AI Interaction, Co-Creativity and User Experience.
            </p>
          </section>
        )}

        <section
          ref={skillsRef}
          id="skills"
          tabIndex={-1}
          aria-labelledby="skills-heading"
        >
          <Skills />
        </section>

        <section
          ref={expRef}
          id="experience"
          tabIndex={-1}
          aria-labelledby="experience-heading"
        >
          <Experience />
        </section>

        {/* Projects */}
        <section
          ref={projectsRef}
          id="projects"
          tabIndex={-1}
          aria-labelledby="projects-heading"
        >
          <h2
            id="projects-heading"
            className="animate-on-scroll"
            style={{ transitionDelay: "0.1s" }}
          >
            Projects
          </h2>

          <div
            className="projects-grid animate-on-scroll"
            style={{ transitionDelay: "0.2s" }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          ref={contactRef}
          id="contact"
          tabIndex={-1}
          aria-labelledby="contact-heading"
        >
          <ContactForm />
        </section>
      </main>
    </div>
  );
}

export default App;
