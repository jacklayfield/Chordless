import { FretboardReadOnly } from "./guitarComponents/fretboardReadOnly";
import { CHORD_TYPE } from "./songBuilder";

interface CPROPS {
  chords: CHORD_TYPE[];
}

export const Song: React.FC<CPROPS> = ({ chords }) => {
  return (
    <div className="center-div">
      {chords.map((chord, i) => {
        return (
          <div className="chords mb-4" key={i}>
            <FretboardReadOnly frets={chord.chordArr} />
            <div className="center-div">
              <span className="chord-name">
                {chord.chordName !== "undefined" ? chord.chordName : ""}
              </span>
            </div>
          </div>
        );
      })}{" "}
    </div>
  );
};
