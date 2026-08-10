import { useEffect } from "react";
import { Hero } from "../../components/Hero";

export function Home() {
  // Nudge the web service in case it's asleep...
  useEffect(() => {
    async function checkAPI() {
      try {
        const res = await fetch(
          "https://aw-portfolio-api.onrender.com/api/status",
        );
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
