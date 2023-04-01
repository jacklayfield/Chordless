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

export const Song: React.FC<CPROPS> = ({ chords, miniFlag, updateSong }) => {
  const perChunk = 3;

  const [localChords, setLocalChords] = useState<CHORD_TYPE[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);

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
    newChordName: string
  ) => {
    let chordObj: CHORD_TYPE = {
      chordArr: newFrets,
      chordName: newChordName,
    };
    let newChords = [...localChords];
    newChords.splice(chordPosition, 1, chordObj);
    setLocalChords(newChords);
  };

  const saveChanges = () => {
    //SET EDITABLE TO FALSE
    //ISSUE CALLBACK WITH CHORDS PASSED BACK UP THE CHAIN
    updateSong(localChords);
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
            onClick={() => setEditMode(false)}
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
          {localChords.map((chord, i) => {
            return (
              <div className="chords mb-4" key={i}>
                <EditChord
                  initialFrets={chord.chordArr}
                  chordPosition={i}
                  updateChords={updateChords}
                />
                <div className="center-div">
                  <span className="chord-name">
                    {chord.chordName !== "undefined" ? chord.chordName : ""}
                  </span>
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
