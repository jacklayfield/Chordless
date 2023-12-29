import { useState } from "react";

import { FretboardReadOnly } from "../guitar/fretboardReadOnly";
import { ChordEditor } from "./chordEditor";
import { OptionsMenu } from "./optionsMenu";

import { playGuitarBody } from "../../utils/sound";
import { deepCloneChords } from "../../utils/general";

import { CHORD_TYPE } from "../../pages/createSong";

interface CPROPS {
  chords: CHORD_TYPE[];
  updateSong: Function;
  sound: string;
}

// These arrays represent the flagged chordIds for the specified action.
let updatedChords: CHORD_TYPE[] = [];
let deletedChords: number[] = [];

let newChordsCount = 0;

export const ChordManager: React.FC<CPROPS> = ({
  chords,
  updateSong,
  sound,
}) => {
  const [localChords, setLocalChords] = useState<CHORD_TYPE[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);

  const updateChords = (
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

    const index = updatedChords.map((e) => e.chordId).indexOf(chordId);

    // If this item already exists in the UPDATED CHORDS list - update it, else push
    if (index !== -1) {
      updatedChords.splice(index, 1, chordObj);
    } else {
      // If this chord is "new" don't add it to the list of chords to be updated in DB.
      if (chordId > -1) {
        updatedChords.push(chordObj);
      }
    }
    // Update our local copy of the chords list
    updateChordsLocally(chordPosition, chordObj);
  };

  const updateChordsLocally = (chordPosition: number, chordObj: CHORD_TYPE) => {
    let newChords = [...localChords];
    newChords.splice(chordPosition, 1, chordObj);
    setLocalChords(newChords);
  };

  const deleteChord = (chordIndex: number, chordId: number) => {
    // So long as this isn't a "new" chord, add it to the list of chords to be deleted from DB.
    if (chordId > 0) {
      deletedChords.push(chordId);
    }

    // Remove from the updatedChords list if it exists there. No need to update it anymore!
    const index = updatedChords.map((e) => e.chordId).indexOf(chordId);
    if (index !== -1) {
      updatedChords.splice(index, 1);
    }

    // Remove from the local list
    deleteChordsLocally(chordIndex);
  };

  const deleteChordsLocally = (chordIndex: number) => {
    let newChords = [...localChords];
    newChords.splice(chordIndex, 1);
    setLocalChords(newChords);
  };

  const addChord = (chordIndex: number) => {
    newChordsCount++;

    let chordObj: CHORD_TYPE = {
      chordArr: [0, 0, 0, 0, 0, 0],
      chordName: "",
      chordId: -1 * (newChordsCount + 1),
    };

    let newChords = [...localChords];
    newChords.splice(chordIndex + 1, 0, chordObj);
    setLocalChords(newChords);
  };

  const saveChanges = () => {
    //SET EDITABLE TO FALSE
    //ISSUE CALLBACK WITH CHORDS PASSED BACK UP THE CHAIN
    updateSong(localChords, updatedChords, deletedChords);
    setEditMode(false);
  };

  const turnEditOn = () => {
    /** Deep clone the chords array here. Only upon clicking "edit"
     *  will the local mutable chords be neccessary. Doing this here
     *  also allows a "fresh" state upon re-editing.
     * */
    setLocalChords(deepCloneChords(chords));

    setEditMode(true);
  };

  const cancel = () => {
    // Clear our flagged chords arrays
    updatedChords = [];
    deletedChords = [];

    setEditMode(false);
  };

  return (
    <div className="center-div">
      {editMode ? (
        <>
          <OptionsMenu
            confirmFunction={saveChanges}
            cancelFunction={cancel}
            confirmText={"Save Changes"}
            cancelText={"Cancel"}
          />
        </>
      ) : (
        <div
          className="chordless-btn edit-chords mb-4"
          onClick={() => turnEditOn()}
        >
          <div className="song-options-edit">
            {" "}
            <i className="fa-solid fa-edit fa-lg"></i> Edit Chords
          </div>
        </div>
      )}
      {editMode ? (
        <div>
          <ChordEditor
            chords={localChords}
            addChord={addChord}
            updateChords={updateChords}
            deleteChord={deleteChord}
            sound={sound}
          />
        </div>
      ) : (
        <div>
          {chords.map((chord, i) => {
            return (
              <div className="chords mb-4" key={i}>
                <div className="center-div">
                  <button
                    className="chordless-btn sound mb-2"
                    onClick={() =>
                      playGuitarBody([0, 1, 2, 3, 4, 5], chord.chordArr, sound)
                    }
                  >
                    <i className="fa-solid fa-volume-high"></i>
                  </button>
                  <FretboardReadOnly frets={chord.chordArr} miniFlag={false} />
                  <div className="center-div">
                    <span className="chord-name">
                      {chord.chordName !== "undefined" ? chord.chordName : ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}{" "}
        </div>
      )}
    </div>
  );
};
