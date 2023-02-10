import React, { useState } from "react";
import { GuitarBody } from "./guitarBody";
import { Fretboard } from "./fretboard";
import "../../styling/guitar.css";

export const Guitar = () => {
  const [currFrets, setCurrFrets] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  return (
    <div className="guitar">
      <GuitarBody currFrets={currFrets} />
      <Fretboard />
    </div>
  );
};
