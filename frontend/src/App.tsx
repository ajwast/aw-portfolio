import "./App.css";
import { useState, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import ProjectCard from "./components/ProjectCard";
import ContactForm from "./components/Contact";

import DsApp from "./assets/DS-UI.png";
import DsDaw from "./assets/DS-DAW.png";
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

  const aboutRef = useRef<HTMLElement | null>(null);
  const skillsRef = useRef<HTMLElement | null>(null);
  const expRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  function scrollTo(ref: React.RefObject<HTMLElement | null>) {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }

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
    {
      title: "Deep Steps JUCE Plugin",
      description:
        "Deep Steps AI sequencer plugin for your DAW. Made with the JUCE C++ framework",
      link: "https://example.com",
      image: DsDaw,
    },
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
      <Header
        name="Alex Wastnidge"
        title="Creative Technologist / Developer"
        onSkillsClick={() => scrollTo(skillsRef)}
        onExpClick={() => scrollTo(expRef)}
        onAboutClick={() => scrollTo(aboutRef)}
        onProjectsClick={() => scrollTo(projectsRef)}
        onContactClick={() => scrollTo(contactRef)}
      />

      <main>
        <Hero />
        {/* About toggle */}
        <button onClick={() => setShowAbout(!showAbout)}>
          {showAbout ? "Hide" : "Show"} About
        </button>

        <section ref={skillsRef}>
          <Skills />
        </section>

        <section ref={expRef}>
          <Experience />
        </section>

        {showAbout && (
          <section ref={aboutRef}>
            <h2>About Me</h2>
            <p>
              I’m a developer and creative technologist working with music,
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

        {/* Projects */}
        <section ref={projectsRef} id="projects">
          <h2>Projects</h2>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section ref={contactRef} id="contact">
          <ContactForm />
        </section>
      </main>
    </div>
  );
}

export default App;
