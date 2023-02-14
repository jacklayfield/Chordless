import React, { useState } from "react";
import { GuitarBody } from "./guitarBody";
import { Fretboard } from "./fretboard";
import "../../styling/guitar.css";

export const Guitar = () => {
  const [currFrets, setCurrFrets] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const updateCurrFrets = (string: number, fret: number) => {
    let newFrets = [...currFrets];
    newFrets[string] = fret !== undefined ? fret : newFrets[string] * -1;
    setCurrFrets(newFrets);
  };

  return (
    <div className="guitar">
      <GuitarBody currFrets={currFrets} />
      <Fretboard currFrets={currFrets} updateCurrFrets={updateCurrFrets} />
    </div>
  );
};
