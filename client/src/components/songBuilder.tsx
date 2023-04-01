import React, { useState } from "react";
import { Fretboard } from "./guitar/fretboard";
import { FretboardReadOnly } from "./guitarReadOnly/fretboardReadOnly";
import { findChord } from "./../utils/chords";
import { useViewport } from "../hooks/useViewport";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styling/guitar.css";

export type CHORD_TYPE = {
  chordArr: number[];
  chordName: String;
  chordId: number;
};

interface SPROPS {
  userFlag: boolean;
}

export const SongBuilder: React.FC<SPROPS> = ({ userFlag }) => {
  const [currFrets, setCurrFrets] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // Note: Will need this hook for later, when each previously submitted chord will be displayed
  const [chords, setChords] = useState<CHORD_TYPE[]>([]);
  const [songName, setSongName] = useState<String>("my song");

  const updateCurrFrets = (string: number, fret: number) => {
    let newFrets = [...currFrets];
    newFrets[string] = fret !== undefined ? fret : -1;
    setCurrFrets(newFrets);
  };

  const updateChords = async (currChord: number[]) => {
    if (!userFlag) {
      window.open("http://localhost:3000/login", "_self");
      return;
    }
    let newChords = [...chords];
    let chordObj: CHORD_TYPE = {
      chordArr: currChord,
      chordName: String(findChord(currChord)),
      // chordId is not relevant here, setting to an invalid index (-1)
      chordId: -1,
    };
    newChords.push(chordObj);
    setChords(newChords);
  };

  const deleteChord = (chordIndex: number) => {
    let newChords = [...chords];
    newChords.splice(chordIndex, 1);
    setChords(newChords);
  };

  const restartSong = () => {
    let newChords: CHORD_TYPE[] = [];
    setChords(newChords);
  };

  const handleSubmit = async () => {
    if (chords.length > 50) {
      toast.warning("Please limit a song to 50 or less chords!", {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }

    try {
      const res = await axios.post("/api/songs/create", {
        data: { chords, songName },
      });
      if (res.status === 200) {
        console.log("submitted song successfully");

        toast.success("Song has been created!", {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setChords([]);
        setCurrFrets([0, 0, 0, 0, 0, 0]);
        (document.getElementById("song-name") as HTMLInputElement).value = "";
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save song...", {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const { width } = useViewport();
  const breakpoint_mobile = 957;

  return width > breakpoint_mobile ? (
    <div className="center-div">
      <ToastContainer autoClose={8000} />
      <h3>Song Name</h3>
      <input
        id="song-name"
        className="mb-4"
        type="text"
        placeholder="my song"
        required
        onChange={(event) => setSongName(event.target.value)}
      ></input>

      <Fretboard
        currFrets={currFrets}
        updateCurrFrets={updateCurrFrets}
        chordIdentifier={0}
      />

      <button
        className="chordless-btn m-4"
        onClick={() => updateChords(currFrets)}
      >
        Add Chord
      </button>
      <h1>Chords</h1>

      {chords.length > 0 ? (
        <div className="center-div">
          <button
            className="chordless-btn delete-chord mb-2"
            onClick={() => restartSong()}
          >
            Clear All Chords
          </button>
          {chords.map((chord, i) => {
            return (
              <div className="chords mb-4" key={i}>
                <FretboardReadOnly frets={chord.chordArr} miniFlag={false} />
                <div className="center-div">
                  <span className="chord-name">
                    {chord.chordName !== "undefined" ? chord.chordName : ""}
                  </span>
                  <button
                    className="chordless-btn delete-chord"
                    onClick={() => deleteChord(i)}
                  >
                    Delete Chord
                  </button>
                </div>
              </div>
            );
          })}{" "}
          <button className="chordless-btn mb-2" onClick={() => handleSubmit()}>
            Save Song
          </button>
        </div>
      ) : (
        <div className="chords">
          No chords added to this song yet! Select the strings on the guitar and
          once finished click "Add Chord".{" "}
        </div>
      )}
    </div>
  ) : (
    <div className="chords" style={{ color: "red", fontWeight: "bold" }}>
      Mobile Version coming Soon! Please use a window size with a width greater
      than 960px for now!
    </div>
  );
};
