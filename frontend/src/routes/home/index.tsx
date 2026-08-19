import { useEffect } from "react";
import { Hero } from "../../components/Hero";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export function Home() {
  // Nudge the web service in case it's asleep...
  useEffect(() => {
    async function checkAPI() {
      try {
        const res = await fetch(`${API_BASE_URL}/status`);
        const data = await res.json();
        console.log(data);
      } catch {
        console.log("API error");
      }
    }
    checkAPI();
  }, []);

  return (
    <div>
      <Hero />
    </div>
  );
}
