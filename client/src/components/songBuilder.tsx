import React, { useState } from "react";
import { Fretboard } from "./guitarComponents/fretboard";
import "../styling/guitar.css";
import "../styling/theme.css";
import { FretboardReadOnly } from "./guitarComponents/fretboardReadOnly";

export const SongBuilder = () => {
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
    <div className="center-div">
      <h3>Song Name</h3>
      <input className="mb-4"></input>
      <Fretboard currFrets={currFrets} updateCurrFrets={updateCurrFrets} />

      <button
        className="chordless-btn m-4"
        onClick={() => updateChords(currFrets)}
      >
        Add Chord
      </button>
      <h1>Chords</h1>

      {chords.length > 0 ? (
        <div className="center-div">
          {chords.map((chord) => {
            return (
              <div className="mb-4">
                <FretboardReadOnly frets={chord} />
              </div>
            );
          })}{" "}
          <button
            className="chordless-btn"
            onClick={() => updateChords(currFrets)}
          >
            Submit Song
          </button>
        </div>
      ) : (
        <div>
          No chords added to this song yet! Select the strings on the guitar and
          once finished click "Add Chord".{" "}
        </div>
      )}
    </div>
  );
};
