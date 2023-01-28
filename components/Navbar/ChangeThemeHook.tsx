import { useEffect, useState } from "react";

export const useChangeThemeHook = (): [
  theme: string,
  handleSetTheme: () => void
] => {
  const [theme, setTheme] = useState("light");

  const nextTheme = theme === "light" ? "dark" : "light";

  const handleSetTheme = () => {
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  useEffect(() => {
    document.body.dataset.theme = theme;
    const lcTheme = localStorage.getItem("theme");

    if (lcTheme && lcTheme !== theme) {
      setTheme(lcTheme);
    }
  }, [theme]);

  return [theme, handleSetTheme];
};
