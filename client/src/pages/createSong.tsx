import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useViewport } from "../hooks/useViewport";
import CurrentUserContext from "../context/context";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Fretboard } from "../components/guitar/fretboard";
import { FretboardReadOnly } from "../components/guitarReadOnly/fretboardReadOnly";
import { findChord } from "../utils/chords";

export type CHORD_TYPE = {
  chordArr: number[];
  chordName: String;
  chordId: number;
};

interface SPROPS {
  userFlag: boolean;
}

export const CreateSong = () => {
  const { width } = useViewport();
  const breakpoint_mid_window = 1440;
  const breakpoint_small_window = 1160;
  const breakpoint_mobile = 957;

  const { currentUser, authIsLoading } = React.useContext(CurrentUserContext);
  console.log(currentUser);

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
    if (!currentUser?.name) {
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

  // While we load user data
  if (authIsLoading) {
    return <div>Loading</div>;
  }
  // If we are in desktop mode
  else if (width > breakpoint_mobile) {
    return (
      <div>
        <Row className="gx-0">
          <Col />
          <Col
            xs={
              width > breakpoint_mid_window
                ? 8
                : width > breakpoint_small_window
                ? 10
                : 12
            }
          >
            <div className="columns">
              <div className="section-titles">
                <header className="section-titles-text">Create Song</header>
              </div>

              <div className="inner-div">
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
                            <FretboardReadOnly
                              frets={chord.chordArr}
                              miniFlag={false}
                            />
                            <div className="center-div">
                              <span className="chord-name">
                                {chord.chordName !== "undefined"
                                  ? chord.chordName
                                  : ""}
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
                      <button
                        className="chordless-btn mb-2"
                        onClick={() => handleSubmit()}
                      >
                        Save Song
                      </button>
                    </div>
                  ) : (
                    <div className="chords">
                      No chords added to this song yet! Select the strings on
                      the guitar and once finished click "Add Chord".{" "}
                    </div>
                  )}
                </div>
                <div>
                  * Please note that chords with a "~" preceding them denote
                  chords that are not their true form, but are inferred. For
                  example, an "A" chord in its true form would have a muted "low
                  E" (A), but an "A" chord is still inferred from leaving the
                  "low E" open (~A).
                </div>
              </div>
            </div>
          </Col>
          <Col />
        </Row>
      </div>
    );
  }
  // Otherwise we are in mobile mode
  else {
    return (
      <div className="chords" style={{ color: "red", fontWeight: "bold" }}>
        Mobile Version coming Soon! Please use a window size with a width
        greater than 960px for now!
      </div>
    );
  }
};
