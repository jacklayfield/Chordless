import { Col, Row } from "react-bootstrap";
import { FretboardReadOnly } from "./guitarReadOnly/fretboardReadOnly";
import { CHORD_TYPE } from "./songBuilder";

interface CPROPS {
  chords: CHORD_TYPE[];
  miniFlag: boolean;
}

export const Song: React.FC<CPROPS> = ({ chords, miniFlag }) => {
  const perChunk = 3;

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

  return miniFlag === false ? (
    <div className="center-div">
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
  ) : (
    <div>
      {chunkedChords.map((chordSet, i) => {
        return (
          <div>
            <Row>
              {chordSet.map((chord) => {
                return (
                  <Col>
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
