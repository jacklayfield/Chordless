import React, { useEffect, useState } from "react";

export const ModeSwitch = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("body")?.setAttribute("data-theme", theme);

    // Force dark slider to stay on right side between page changes
    if (theme === "dark") {
      document.querySelector("input")?.setAttribute("checked", "checked");
    } else {
      document.querySelector("input")?.removeAttribute("checked");
    }
  }, [theme]);

  const madness = () => {
    setTheme("madness");
    document.querySelector("input")?.removeAttribute("checked");
  };

  return (
    <div className="center-div pt-4">
      <label onClick={madness}>Toggle Mode ({theme})</label>
      <label className="switch">
        <input type="checkbox" id="switch" onClick={toggleTheme} />
        <span className="slider" />
      </label>
    </div>
  );
};
