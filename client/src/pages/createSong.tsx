import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useViewport } from "../hooks/useViewport";
import CurrentUserContext from "../context/context";
import { toast, ToastContainer } from "react-toastify";
import { ChordEditor } from "../components/song/chordEditor";
import { OptionsMenu } from "../components/song/optionsMenu";
import { createSongRequest } from "../api/apiSong";
import { apiRequest } from "../api/request";
import { findError } from "../api/error";

export type CHORD_TYPE = {
  chordArr: number[];
  chordName: String;
  chordId: number;
};

interface SPROPS {
  userFlag: boolean;
}

let newChordsCount = 0;

export const CreateSong = () => {
  const { width } = useViewport();
  const breakpoint_mid_window = 1440;
  const breakpoint_small_window = 1160;
  const breakpoint_mobile = 957;

  const { currentUser, authIsLoading, handleLogout } =
    React.useContext(CurrentUserContext);

  const [currFrets, setCurrFrets] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // Note: Will need this hook for later, when each previously submitted chord will be displayed
  const [chords, setChords] = useState<CHORD_TYPE[]>([]);
  const [songName, setSongName] = useState<String>("my song");

  const updateCurrFrets = (string: number, fret: number) => {
    let newFrets = [...currFrets];
    newFrets[string] = fret !== undefined ? fret : -1;
    setCurrFrets(newFrets);
  };

  const updateChords = async (
    newFrets: number[],
    chordPosition: number,
    newChordName: string,
    chordId: number
  ) => {
    if (!currentUser?.name) {
      window.open("http://localhost:3000/login", "_self");
      return;
    }
    let chordObj: CHORD_TYPE = {
      chordArr: newFrets,
      chordName: newChordName,
      chordId: chordId,
    };
    let newChords = [...chords];
    newChords.splice(chordPosition, 1, chordObj);
    setChords(newChords);
  };

  const addChord = (chordIndex: number) => {
    newChordsCount++;

    let chordObj: CHORD_TYPE = {
      chordArr: [0, 0, 0, 0, 0, 0],
      chordName: "",
      chordId: -1 * (newChordsCount + 1),
    };

    let newChords = [...chords];
    newChords.splice(chordIndex + 1, 0, chordObj);
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

    let res = await apiRequest(() => createSongRequest(songName, chords));

    // On success
    if (res.status === 200) {
      toast.success("Song has been created!", {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setChords([]);
      setCurrFrets([0, 0, 0, 0, 0, 0]);
      (document.getElementById("song-name") as HTMLInputElement).value = "";

      console.log(res);
    }
    // On failure
    else {
      if (findError(res) == 403) {
        toast.error("Failed to save song... (Please login!)", {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.error("Failed to save song... (Server error :/)", {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
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

                  {chords.length > 0 ? (
                    <div className="center-div">
                      <OptionsMenu
                        confirmFunction={handleSubmit}
                        cancelFunction={restartSong}
                        confirmText={"Save Song"}
                        cancelText={"Restart / Cancel"}
                      />
                    </div>
                  ) : (
                    <div className="chords">
                      No chords added to this song yet! Click the plus (+)
                      button to add your first chord!{" "}
                    </div>
                  )}

                  <ChordEditor
                    chords={chords}
                    addChord={addChord}
                    updateChords={updateChords}
                    deleteChord={deleteChord}
                  />
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
