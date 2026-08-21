import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Section } from "../../components/UI/Section";
import { SectionHeading } from "../../components/UI/SectionHeading";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Shape of the form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <Section className="mt-2">
      <SectionHeading>Contact</SectionHeading>
      <div className="flex flex-col w-xl h-xl gap-4">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-xl mb-4 bg-amber-50"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-xl mb-4 bg-amber-50"
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-xl h-20 mb-4 bg-amber-50"
            />
          </div>
          <button
            type="submit"
            className="inline-block bg-amber-50 text-gray-900 font-jost font-bold px-8 py-2.5 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300 active:scale-95 text-center shadow-lg hover:shadow-rose-500/40 w-full md:w-auto uppercase tracking-wider text-sm"
          >
            Send Message
          </button>
        </form>
        {status && <p>{status}</p>}
      </div>
    </Section>
  );
}
