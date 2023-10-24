import React, { useState } from "react";

export const ModeSwitch = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const setMode = () => {
    if (
      document.querySelector("body")?.getAttribute("data-theme") === "light"
    ) {
      document.querySelector("body")?.setAttribute("data-theme", "dark");
    } else {
      document.querySelector("body")?.setAttribute("data-theme", "light");
    }
    setChecked(!checked);
  };

  return (
    <div className="center-div mt-2">
      <button onClick={setMode}>Change Mode</button>
    </div>
  );
};
