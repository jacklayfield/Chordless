import { CHORD_TYPE } from "../../pages/createSong";
import { Col, Row } from "react-bootstrap";
import { FretboardReadOnly } from "../guitar/fretboardReadOnly";

interface MPROPS {
  chords: CHORD_TYPE[];
}

export const MiniChords: React.FC<MPROPS> = ({ chords }) => {
  const perChunk = 2;

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
  return (
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
                        miniFlag={true}
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
