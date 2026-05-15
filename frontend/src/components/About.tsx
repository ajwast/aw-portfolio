import profileImage from "../assets/profile.jpg";
import { Section } from "./UI/Section";
import { SectionHeading } from "./UI/SectionHeading";

export function About() {
  return (
    <Section>
      <SectionHeading>ABOUT ME</SectionHeading>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        <div className="flex-1">
          <p className="text-lg md:text-xl leading-relaxed tracking-wide text-blue-50/90">
            I'm a developer and creative technologist working with music, code,
            and interactive systems. I have a background in Music Production,
            Audio Engineering, Audio Programming and Education. I developed "Deep
            Steps", a MIDI step sequencer with an integrated user-trainable
            generative neural network. Deep Steps was presented at The
            International Conference on AI and Musical Creativity 2024. This work
            covered AI in Music, Human-Computer Interaction, Human-AI Interaction,
            Co-Creativity and User Experience.
          </p>
        </div>
        <div className="flex-shrink-0">
          <img
            src={profileImage}
            alt="Alex Wastnidge"
            className="rounded-full h-48 w-48 md:h-64 md:w-64 object-cover border-4 border-blue-50/10 shadow-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </Section>
  );
}
