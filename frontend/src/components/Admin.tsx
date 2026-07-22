import { Section } from "./UI/Section";
import { SectionHeading } from "./UI/SectionHeading";
import type { SubmitEvent } from "react";

interface AdminProps {
  token: string;
  onLogout: () => void;
}

export function Admin({ token, onLogout }: AdminProps) {
  const handleProjectSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const projectData = new FormData(event.currentTarget);
    const name = projectData.get("name");
    const description = projectData.get("description");
    const link = projectData.get("link");
    const image = projectData.get("image");

    try {
      // Make an authenticated API request using the token prop in the header
      const response = await fetch(
        "https://aw-portfolio-api.onrender.com/api/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Injects the JWT safely
          },
          body: JSON.stringify({ name, description, link, image }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to post administrative data.");
      }

      alert("Project added successfully");
      event.currentTarget.reset();
    } catch (error) {
      console.error("Admin submit error:", error);
    }
  };
  return (
    <Section>
      <div className="flex justify-between items-center mb-8 border-b-2 pb-4">
        <SectionHeading>ADMIN</SectionHeading>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white font-bold px-4 py-2 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="w-full max-w-7xl px-4 md:px-8 animate-fade-in-up font-jost py-8 bg-gray-700">
        <h2 className="font-bold mb-2">Add Project</h2>
        <form
          action=""
          onSubmit={handleProjectSubmit}
          className="flex flex-col my-auto"
        >
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-amber-50 border-2 mb-3 text-black"
          />

          <label htmlFor="">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            className="bg-amber-50 border-2 mb-3 text-black"
          />

          <label htmlFor="">Link</label>
          <input
            type="text"
            name="link"
            id="link"
            className="bg-amber-50 border-2 mb-3 text-black"
          />

          <label htmlFor="">Image URL</label>
          <input
            type="text"
            name="image"
            id="image"
            className="bg-amber-50 border-2 mb-3 text-black"
          />
          <button type="submit" className="bg-amber-50 text-gray-800">
            Add Project
          </button>
        </form>
      </div>
    </Section>
  );
}
