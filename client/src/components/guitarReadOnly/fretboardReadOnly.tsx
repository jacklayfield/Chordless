import React from "react";
import { FretboardBg } from "../guitar/fretboardBg";
import { FretMarkersReadOnly } from "./fretMarkersReadOnly";
import { MuteBtnsReadOnly } from "./muteBtnsReadOnly";

interface FPROPS {
  frets: number[];
}

export const FretboardReadOnly: React.FC<FPROPS> = ({ frets }) => {
  return (
    <div className="fretboard-container">
      <MuteBtnsReadOnly frets={frets} />
      <FretboardBg />
      <FretMarkersReadOnly frets={frets} />
    </div>
  );
};
