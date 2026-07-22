import type { SubmitEvent } from "react"; // Changed SubmitEvent to standard FormEvent
import { Section } from "./UI/Section";
import { SectionHeading } from "./UI/SectionHeading";

interface LoginProp {
  onLogin: (incomingData: string) => void;
}

export function Login({ onLogin }: LoginProp) {
  // REMOVED: const [token, setToken] = useState<string>("");
  // Storing the token here locally isn't needed anymore since the parent manages it.

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await fetch(
        "https://aw-portfolio-api.onrender.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
      );

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();

      if (data.token) {
        onLogin(data.token);
      } else {
        console.log("No token returned from server:", data.error);
      }
    } catch (error) {
      console.log("Network error caught:", error);
    }
  };

  return (
    <Section>
      <SectionHeading>ADMIN LOGIN</SectionHeading>
      <div className="w-full max-w-7xl px-4 md:px-8 animate-fade-in-up font-jost py-8">
        <form className="flex flex-col my-auto" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="bg-amber-50 border-2 mb-3 text-black"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-amber-50 border-2 mb-9 text-black"
            required
          />
          <button
            type="submit"
            className="text-gray-800 bg-amber-50 p-2 border"
          >
            Login
          </button>
        </form>
      </div>
    </Section>
  );
}
