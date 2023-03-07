import React from "react";
import { FretboardBg } from "./fretboardBg";
import { MuteBtns } from "./muteBtns";
import { FretMarkers } from "./fretMarkers";

interface FPROPS {
  currFrets: number[];
  updateCurrFrets: Function;
}

export const Fretboard: React.FC<FPROPS> = ({ currFrets, updateCurrFrets }) => {
  return (
    <div className="fretboard-container">
      <MuteBtns currFrets={currFrets} updateCurrFrets={updateCurrFrets} />
      <FretboardBg miniFlag={false} />
      <FretMarkers currFrets={currFrets} updateCurrFrets={updateCurrFrets} />
    </div>
  );
};
