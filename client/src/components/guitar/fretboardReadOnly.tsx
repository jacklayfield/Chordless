import React from "react";
import { FretboardBg } from "./fretboardBg";
import { FretMarkersReadOnly } from "./fretMarkersReadOnly";
import { MuteBtnsReadOnly } from "./muteBtnsReadOnly";

interface FPROPS {
  frets: number[];
  miniFlag: boolean;
}

export const FretboardReadOnly: React.FC<FPROPS> = ({ frets, miniFlag }) => {
  return (
    <div className="fretboard-container">
      <MuteBtnsReadOnly frets={frets} miniFlag={miniFlag} />
      <FretboardBg miniFlag={miniFlag} />
      <FretMarkersReadOnly frets={frets} miniFlag={miniFlag} />
    </div>
  );
};
