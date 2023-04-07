import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { EditChord } from "./editChord";
import { FretboardReadOnly } from "./guitarReadOnly/fretboardReadOnly";
import { CHORD_TYPE } from "./songBuilder";
import { deepCloneChords } from "../utils/general";

interface CPROPS {
  chords: CHORD_TYPE[];
  miniFlag: boolean;
  updateSong: Function;
}

// These arrays represent the flagged chordIds for the specified action.
let updatedChords: CHORD_TYPE[] = [];
let deletedChords: number[] = [];
let createdChords: CHORD_TYPE[] = []; // Development to come

export const Song: React.FC<CPROPS> = ({ chords, miniFlag, updateSong }) => {
  const perChunk = 3;

  const [localChords, setLocalChords] = useState<CHORD_TYPE[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  let newChordsCount = 0;

  const chunkedChords = chords.reduce(
    (resultArray: CHORD_TYPE[][], item: CHORD_TYPE, index: number) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    },
    []
  );

  const updateChords = (
    newFrets: number[],
    chordPosition: number,
    newChordName: string,
    chordId: number
  ) => {
    if (chordId == -1) {
      return;
    }
    let chordObj: CHORD_TYPE = {
      chordArr: newFrets,
      chordName: newChordName,
      chordId: chordId,
    };

    const index = updatedChords.map((e) => e.chordId).indexOf(chordId);

    if (index !== -1) {
      updatedChords.splice(index, 1, chordObj);
    } else {
      updatedChords.push(chordObj);
    }

    console.log("size of update list: " + updatedChords.length);
    console.log("first element of list: " + updatedChords[0].chordArr);

    let newChords = [...localChords];
    newChords.splice(chordPosition, 1, chordObj);
    setLocalChords(newChords);
    console.log("id: " + chordId);
  };

  const deleteChord = (chordIndex: number, chordId: number) => {
    deletedChords.push(chordId);
    console.log("size of delete list: " + deletedChords.length);
    console.log("first element of list: " + deletedChords);
    let newChords = [...localChords];
    newChords.splice(chordIndex, 1);
    setLocalChords(newChords);
  };

  const addChord = (chordIndex: number) => {
    newChordsCount++;

    let chordObj: CHORD_TYPE = {
      chordArr: [0, 0, 0, 0, 0, 0],
      chordName: "",
      chordId: -1 * newChordsCount,
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
    createdChords = [];

    setEditMode(false);
  };

  return miniFlag === false ? (
    <div className="center-div">
      {editMode ? (
        <div className="flex-container">
          {" "}
          <div
            className="chordless-btn edit-chords m-4"
            onClick={() => saveChanges()}
          >
            <div className="song-options-save">
              {" "}
              <i className="fa-solid fa-floppy-disk fa-lg"></i> Save Changes
            </div>
          </div>
          <div
            className="chordless-btn edit-chords m-4"
            onClick={() => cancel()}
          >
            <div className="song-options-cancel">
              {" "}
              <i className="fa-solid fa-xmark fa-lg"></i> Cancel
            </div>
          </div>
        </div>
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
          {" "}
          <div className="center-div mb-2">
            <div onClick={() => addChord(-1)} className="new-chord-btn">
              <i className="fa-solid fa-plus fa-lg"></i>
            </div>
          </div>
          {localChords.map((chord, i) => {
            return (
              <div key={chord.chordId}>
                <div className="chords mb-2">
                  {chord.chordId === -1 && (
                    <div className="new-label">
                      <i className="fa-solid fa-star-of-life"></i> New
                    </div>
                  )}

                  {chord.chordArr}
                  <EditChord
                    initialFrets={chord.chordArr}
                    chordPosition={i}
                    chordId={chord.chordId}
                    updateChords={updateChords}
                  />

                  <div className="center-div">
                    <span className="chord-name">
                      {chord.chordName !== "undefined" ? chord.chordName : ""}
                    </span>
                    <button
                      className="chordless-btn delete-chord"
                      onClick={() => deleteChord(i, chord.chordId)}
                    >
                      Delete Chord
                    </button>
                  </div>
                </div>{" "}
                <div className="center-div mb-2">
                  <div onClick={() => addChord(i)} className="new-chord-btn">
                    <i className="fa-solid fa-plus fa-lg"></i>
                  </div>
                </div>
              </div>
            );
          })}{" "}
        </div>
      ) : (
        <div>
          {chords.map((chord, i) => {
            return (
              <div className="chords mb-4" key={i}>
                <FretboardReadOnly frets={chord.chordArr} miniFlag={miniFlag} />
                <div className="center-div">
                  <span className="chord-name">
                    {chord.chordName !== "undefined" ? chord.chordName : ""}
                  </span>
                </div>
              </div>
            );
          })}{" "}
        </div>
      )}
    </div>
  ) : (
    <div>
      {chunkedChords.map((chordSet, i) => {
        return (
          <div key={i}>
            <Row>
              {chordSet.map((chord, i) => {
                return (
                  <Col key={i}>
                    <div className="center-div">
                      <FretboardReadOnly
                        frets={chord.chordArr}
                        miniFlag={miniFlag}
                      />
                      <div className="center-div">
                        <span className="chord-name-small">
                          {chord.chordName !== "undefined"
                            ? chord.chordName
                            : ""}
                        </span>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        );
      })}
    </div>
  );
};
