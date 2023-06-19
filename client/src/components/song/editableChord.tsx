import React, { useState } from "react";
import { Fretboard } from "../guitar/fretboard";
import { findChord } from "../../utils/chords";
import { useViewport } from "../../hooks/useViewport";
import "../../styling/guitar.css";

interface SPROPS {
  initialFrets: number[];
  chordPosition: number;
  updateChords: Function;
  chordId: number;
}

export const EditableChord: React.FC<SPROPS> = ({
  initialFrets,
  chordPosition,
  updateChords,
  chordId,
}) => {
  const [currFrets, setCurrFrets] = useState<number[]>(initialFrets);

  const updateCurrFrets = (string: number, fret: number) => {
    let newFrets = [...currFrets];
    newFrets[string] = fret !== undefined ? fret : -1;
    setCurrFrets(newFrets);
    // Callback to tell actual chord array to update upon changes to the chord
    updateChords(newFrets, chordPosition, findChord(newFrets), chordId);
  };

  const { width } = useViewport();
  const breakpoint_mobile = 957;

  return width > breakpoint_mobile ? (
    <Fretboard
      currFrets={currFrets}
      updateCurrFrets={updateCurrFrets}
      chordIdentifier={chordId}
    />
  ) : (
    <div className="chords" style={{ color: "red", fontWeight: "bold" }}>
      Mobile Version coming Soon! Please use a window size with a width greater
      than 960px for now! (You may use a landscape iPad / iPad Mini!)
    </div>
  );
};
