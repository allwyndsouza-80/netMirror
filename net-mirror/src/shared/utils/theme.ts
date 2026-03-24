export type Theme = "light" | "dark";

const THEME_KEY = "netmirror-theme";

export const getStoredTheme = (): Theme | null => {
  return localStorage.getItem(THEME_KEY) as Theme | null;
};

export const setTheme = (theme: Theme) => {
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(theme);

  localStorage.setItem("netmirror-theme", theme);

  console.log("THEME SET:", theme);
};;

export const initTheme = () => {
  const stored = getStoredTheme();
    console.log('stored', stored)
  if (stored) {
    setTheme(stored);
  } else {
    setTheme("dark"); // default
  }
};