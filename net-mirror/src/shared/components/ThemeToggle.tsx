import { useState, useEffect } from "react";
import { getStoredTheme, setTheme } from "../utils/theme";

export default function ThemeToggle() {
  const [theme, setLocalTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const stored = getStoredTheme();
    if (stored) setLocalTheme(stored);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setLocalTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 border rounded"
    >
      Switch to {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}