import React, { useState } from "react";

export const ModeSwitch = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const setMode = () => {
    if (
      document.querySelector("body")?.getAttribute("data-theme") === "light" ||
      document.querySelector("body")?.getAttribute("data-theme") === null
    ) {
      document.querySelector("body")?.setAttribute("data-theme", "dark");
    } else {
      document.querySelector("body")?.setAttribute("data-theme", "light");
    }
    setChecked(!checked);
  };

  return (
    <div className="center-div pt-4">
      <label>Dark / Light Mode</label>
      <label className="switch">
        <input type="checkbox" onClick={setMode} />
        <span className="slider" />
      </label>
    </div>
  );
};
