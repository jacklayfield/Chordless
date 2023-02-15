import React from "react";
import { FretboardBg } from "./fretboardBg";
import { MuteBtns } from "./muteBtns";
import { FretMarkers } from "./fretMarkers";
import { FretMarkersReadOnly } from "./fretMarkersReadOnly";
import { MuteBtnsReadOnly } from "./muteBtnsReadOnly";

interface FPROPS {
  frets: number[];
}

export const FretboardReadOnly: React.FC<FPROPS> = ({ frets }) => {
  return (
    <div className="fretboard-container">
      {/* <MuteBtns currFrets={currFrets} updateCurrFrets={updateCurrFrets} /> */}
      {/* <MuteBtns currFrets={frets} updateCurrFrets={() => {}} /> */}
      <MuteBtnsReadOnly frets={frets} />
      <FretboardBg />
      <FretMarkersReadOnly frets={frets} />

      {/* <FretMarkers currFrets={currFrets} updateCurrFrets={updateCurrFrets} /> */}
    </div>
  );
};
