import { CHORD_TYPE } from "../../pages/createSong";
import { Col, Row } from "react-bootstrap";
import { FretboardReadOnly } from "../guitar/fretboardReadOnly";
import { EditableChord } from "./editableChord";

interface EPROPS {
  chords: CHORD_TYPE[];
  addChord: Function;
  updateChords: Function;
  deleteChord: Function;
}

export const ChordEditor: React.FC<EPROPS> = ({
  chords,
  addChord,
  updateChords,
  deleteChord,
}) => {
  return (
    <div>
      {" "}
      <div className="center-div mb-2">
        <div onClick={() => addChord(-1)} className="new-chord-btn">
          <i className="fa-solid fa-plus fa-lg"></i>
        </div>
      </div>
      {chords.map((chord, i) => {
        return (
          <div key={chord.chordId}>
            <div className="chords mb-2">
              {chord.chordId === -1 && (
                <div className="new-label">
                  <i className="fa-solid fa-star-of-life"></i> New
                </div>
              )}

              {chord.chordArr}
              <EditableChord
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
  );
};