import React, { useState } from "react";
import CurrentUserContext from "../context/context";
import { toast, ToastContainer } from "react-toastify";
import { ChordEditor } from "../components/song/chordEditor";
import { OptionsMenu } from "../components/song/optionsMenu";
import { createSongRequest } from "../api/apiSong";
import { apiRequest } from "../api/request";
import { findAxiosError } from "../api/error";
import { ApiConnecting } from "../components/general/apiConnecting";
import { Loading } from "../components/general/loading";

export type CHORD_TYPE = {
  chordArr: number[];
  chordName: String;
  chordId: number;
};

let newChordsCount = 0;

export const CreateSong = () => {
  const { currentUser, authIsLoading, apiIsLoading } =
    React.useContext(CurrentUserContext);

  // Note: Will need this hook for later, when each previously submitted chord will be displayed
  const [chords, setChords] = useState<CHORD_TYPE[]>([]);
  const [songName, setSongName] = useState<String>("my song");

  const updateChords = async (
    newFrets: number[],
    chordPosition: number,
    newChordName: string,
    chordId: number
  ) => {
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
      (document.getElementById("song-name") as HTMLInputElement).value = "";
    }
    // On failure
    else {
      if (findAxiosError(res) === 403) {
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

  if (apiIsLoading) {
    return <ApiConnecting />;
  } else if (authIsLoading) {
    return <Loading />;
  } else {
    return (
      <div className="inner-div center-div">
        <ToastContainer autoClose={8000} />
        <h3>Song Name</h3>
        <input
          id="song-name"
          className="song-input mb-4"
          type="text"
          placeholder="my song"
          required
          onChange={(event) => setSongName(event.target.value)}
        ></input>

        {chords.length > 0 ? (
          <>
            <OptionsMenu
              confirmFunction={handleSubmit}
              cancelFunction={restartSong}
              confirmText={"Save Song"}
              cancelText={"Restart / Cancel"}
            />
          </>
        ) : (
          <div className="chords">
            No chords added to this song yet! Click the plus (+) button to add
            your first chord!{" "}
          </div>
        )}
        {!currentUser?.username && !authIsLoading && chords.length !== 0 && (
          <div className="login-status">
            WARNING: You are NOT logged in. Feel free to play around, but you
            will NOT be able to save progress!
          </div>
        )}

        <ChordEditor
          chords={chords}
          addChord={addChord}
          updateChords={updateChords}
          deleteChord={deleteChord}
        />

        <>
          * Please note that chords with a "~" preceding them denote chords that
          are not their true form, but are inferred. For example, an "A" chord
          in its true form would have a muted "low E" (A), but an "A" chord is
          still inferred from leaving the "low E" open (~A).
        </>
      </div>
    );
  }

  // Otherwise we are in mobile mode
};
