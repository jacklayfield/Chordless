import React, { useState } from "react";
import { Fretboard } from "./guitarComponents/fretboard";
import "../styling/guitar.css";
import "../styling/theme.css";
import { FretboardReadOnly } from "./guitarComponents/fretboardReadOnly";
import { findChord } from "./../utils/chords";

export const SongBuilder = () => {
  const [currFrets, setCurrFrets] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  type CHORD_OBJECT = {
    chordArr: number[];
    chordName: String;
  };

  // Note: Will need this hook for later, when each previously submitted chord will be displayed
  const [chords, setChords] = useState<CHORD_OBJECT[]>([]);

  const updateCurrFrets = (string: number, fret: number) => {
    let newFrets = [...currFrets];
    newFrets[string] = fret !== undefined ? fret : newFrets[string] * -1;
    setCurrFrets(newFrets);
  };

  const updateChords = (currChord: number[]) => {
    let newChords = [...chords];
    let chordObj: CHORD_OBJECT = {
      chordArr: currChord,
      chordName: String(findChord(currChord)),
    };
    newChords.push(chordObj);
    setChords(newChords);
  };

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
          {chords.map((chord, i) => {
            return (
              <div className="mb-4" key={i}>
                <FretboardReadOnly frets={chord.chordArr} />
                {chord.chordName}
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
