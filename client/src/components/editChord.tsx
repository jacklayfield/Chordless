import React, { useState } from "react";
import { Fretboard } from "./guitar/fretboard";
import { findChord } from "./../utils/chords";
import { useViewport } from "../hooks/useViewport";
import "../styling/guitar.css";

interface SPROPS {
  initialFrets: number[];
  chordPosition: number;
  updateChords: Function;
}

export const EditChord: React.FC<SPROPS> = ({
  initialFrets,
  chordPosition,
  updateChords,
}) => {
  const [currFrets, setCurrFrets] = useState<number[]>(initialFrets);

  const updateCurrFrets = (string: number, fret: number) => {
    let newFrets = [...currFrets];
    newFrets[string] = fret !== undefined ? fret : -1;
    setCurrFrets(newFrets);
    // Callback to tell actual chord array to update upon changes in "song" component
    updateChords(newFrets, chordPosition, findChord(newFrets));
  };

  const { width } = useViewport();
  const breakpoint_mobile = 957;

  return width > breakpoint_mobile ? (
    <div className="center-div">
      <Fretboard currFrets={currFrets} updateCurrFrets={updateCurrFrets} />
    </div>
  ) : (
    <div className="chords" style={{ color: "red", fontWeight: "bold" }}>
      Mobile Version coming Soon! Please use a window size with a width greater
      than 960px for now!
    </div>
  );
};
