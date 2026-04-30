import profileImage from "../assets/profile.jpg";

export function About() {
  return (
    <div className=" text-blue-50 bg-gray-900 font-jost p-3 opacity-90 mb-3">
      <h2 className="text-3xl font-jost tracking-wider mt-3 mb-4 animate-fade-in-up border-b">
        ABOUT ME
      </h2>
      <div className="flex justify-evenly">
        <p className=" text-xl pe-5 tracking-wide">
          I'm a developer and creative technologist working with music, code,
          and interactive systems. I have a background in Music Production,
          Audio Engineering, Audio Programming and Education. I developed "Deep
          Steps", a MIDI step sequencer with an integrated user-trainable
          generative neural network. Deep Steps was presented at The
          International Conference on AI and Musical Creativity 2024. This work
          covered AI in Music, Human-Computer Interaction, Human-AI Interaction,
          Co-Creativity and User Experience.
        </p>
        <img
          src={profileImage}
          alt="Alex Wastnidge"
          className="rounded-full h-48 w-48 object-cover border-4 border-blue-50/20 shadow-xl opacity-90 me-3"
        />
      </div>
    </div>
  );
}
