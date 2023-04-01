import React from "react";
import { FretboardBg } from "./fretboardBg";
import { MuteBtns } from "./muteBtns";
import { FretMarkers } from "./fretMarkers";

interface FPROPS {
  currFrets: number[];
  updateCurrFrets: Function;
  chordIdentifier: number;
  // Identification for mapping list of mutable chords.
  // Only relevant for "edit chords" display.
}

export const Fretboard: React.FC<FPROPS> = ({
  currFrets,
  updateCurrFrets,
  chordIdentifier,
}) => {
  return (
    <div className="fretboard-container">
      <MuteBtns
        currFrets={currFrets}
        updateCurrFrets={updateCurrFrets}
        chordIdentifier={chordIdentifier}
      />
      <FretboardBg miniFlag={false} />
      <FretMarkers currFrets={currFrets} updateCurrFrets={updateCurrFrets} />
    </div>
  );
};
