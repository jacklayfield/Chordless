import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { EditChord } from "./editChord";
import { FretboardReadOnly } from "./guitarReadOnly/fretboardReadOnly";
import { CHORD_TYPE } from "./songBuilder";

interface CPROPS {
  chords: CHORD_TYPE[];
  miniFlag: boolean;
  updateSong: Function;
}

export const Song: React.FC<CPROPS> = ({ chords, miniFlag, updateSong }) => {
  const perChunk = 3;

  const [localChords, setLocalChords] = useState<CHORD_TYPE[]>(chords);
  const [editMode, setEditMode] = useState<boolean>(false);

  const chunkedChords = chords.reduce(
    (resultArray: CHORD_TYPE[][], item, index) => {
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
    console.log("Test worked");
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

  return miniFlag === false ? (
    <div className="center-div">
      {editMode ? (
        <div
          className="chordless-btn edit-chords mb-4"
          onClick={() => saveChanges()}
        >
          <div className="song-options-save">
            {" "}
            <i className="fa-solid fa-floppy-disk fa-lg"></i> Save Changes
          </div>
        </div>
      ) : (
        <div
          className="chordless-btn edit-chords mb-4"
          onClick={() => setEditMode(true)}
        >
          <div className="song-options-edit">
            {" "}
            <i className="fa-solid fa-edit fa-lg"></i> Edit Chords
          </div>
        </div>
      )}
      {localChords.map((chord, i) => {
        return (
          <div className="chords mb-4" key={i}>
            {editMode ? (
              <EditChord
                initialFrets={chord.chordArr}
                chordPosition={i}
                updateChords={updateChords}
              />
            ) : (
              <FretboardReadOnly frets={chord.chordArr} miniFlag={miniFlag} />
            )}
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
