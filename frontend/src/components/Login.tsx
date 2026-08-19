import { useState } from "react";
import type { FormEvent } from "react";
import { Section } from "./UI/Section";
import { SectionHeading } from "./UI/SectionHeading";

interface LoginProp {
  onLogin: (incomingData: string) => void;
}
const API_BASE_URL = import.meta.env.VITE_API_URL;
export function Login({ onLogin }: LoginProp) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials or server error");
      }

      const data = await response.json();

      if (data.token) {
        onLogin(data.token);
      } else {
        setErrorMsg(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Authentication failed. Please check credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section className="w-full max-w-md mx-auto font-jost my-8">
      <SectionHeading>ADMIN LOGIN</SectionHeading>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl mt-6">
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full bg-gray-950/80 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-rose-400 transition-colors text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white/80 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full bg-gray-950/80 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-rose-400 transition-colors text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full bg-white text-gray-900 font-bold py-2.5 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-md uppercase tracking-wider text-xs disabled:opacity-50"
          >
            {isSubmitting ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </Section>
  );
}
