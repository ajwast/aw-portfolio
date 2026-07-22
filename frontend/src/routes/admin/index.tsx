import { Login } from "../../components/Login";
import { Admin } from "../../components/Admin"; // Uncommented this
import { useState } from "react";

export function AdminPanel() {
  const [token, setToken] = useState<string>("");

  const handleLogin = (incomingData: string): void => {
    setToken(incomingData);
    console.log("Token stored in Parent:", incomingData);
  };

  const handleLogout = (): void => {
    setToken(""); // Simple logout function by wiping state
  };

  // Conditional rendering layout rule
  if (token) {
    return <Admin token={token} onLogout={handleLogout} />;
  }

  return <Login onLogin={handleLogin} />;
}
