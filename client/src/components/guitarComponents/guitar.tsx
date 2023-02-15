import React, { useState } from "react";
import { GuitarBody } from "./guitarBody";
import { Fretboard } from "./fretboard";
import "../../styling/guitar.css";
import "../../styling/theme.css";
import { FretboardReadOnly } from "./fretboardReadOnly";

export const Guitar = () => {
  const [currFrets, setCurrFrets] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // Note: Will need this hook for later, when each previously submitted chord will be displayed
  const [chords, setChords] = useState<number[][]>([]);

  const updateCurrFrets = (string: number, fret: number) => {
    let newFrets = [...currFrets];
    newFrets[string] = fret !== undefined ? fret : newFrets[string] * -1;
    setCurrFrets(newFrets);
  };

  const updateChords = (currChord: number[]) => {
    let newChords = [...chords];
    newChords.push(currChord);
    setChords(newChords);
  };

  console.log(chords);

  return (
    <div className="guitar">
      <div className="center-div">
        <h3>Song Name</h3>
        <input></input>
      </div>
      <Fretboard currFrets={currFrets} updateCurrFrets={updateCurrFrets} />

      <div className="center-div">
        <button
          className="chordless-btn"
          onClick={() => updateChords(currFrets)}
        >
          Add Chord
        </button>
      </div>
      <div className="center-div">
        <h1>Chords</h1>
      </div>
      {chords.map((chord) => {
        return (
          <div style={{ paddingBottom: "1rem" }}>
            <FretboardReadOnly frets={chord} />
          </div>
        );
      })}
    </div>
  );
};
