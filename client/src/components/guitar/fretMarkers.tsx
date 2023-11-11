import React, { useState } from "react";
import {
  fbSize,
  fretPositions,
  stringPositions,
} from "../../utils/fretboardValues";

interface FPROPS {
  currFrets: number[];
  updateCurrFrets: Function;
}

export const FretMarkers: React.FC<FPROPS> = ({
  currFrets,
  updateCurrFrets,
}) => {
  const [string, setString] = useState<number>(-1);
  const [fret, setFret] = useState<number>(0);

  const fretMarker = (
    <circle
      cx={
        fret > 0
          ? `${
              fretPositions[fret] -
              0.5 * (fretPositions[fret] - fretPositions[fret - 1])
            }`
          : `${fretPositions[fret] - 6}`
      }
      cy={`${stringPositions[string]}`}
      r="6"
      fill="rgba(255,255,255,0.7)"
      stroke="#fff"
    />
  );
  const hideMarker = () => {
    setString(-1);
  };

  const showMarker = (e: {
    nativeEvent: { offsetY: number; offsetX: number };
  }) => {
    let s = Math.floor(
      (6 / fbSize.height) * (fbSize.height - 1 - e.nativeEvent.offsetY)
    );
    let f = fretPositions.findIndex((pos) => e.nativeEvent.offsetX < pos);
    f = f === -1 ? 0 : f;
    s = s > 5 || s < 0 ? -1 : s;
    setString(s);
    setFret(f);
  };

  const isMuted = (fret: number) => {
    return fret < 0 || Object.is(fret, -0);
  };

  const fretMarkers = currFrets.map((f, i) => {
    if (!isMuted(f)) {
      return (
        <circle
          key={i}
          cx={
            f > 0
              ? `${
                  fretPositions[f] -
                  0.5 * (fretPositions[f] - fretPositions[f - 1])
                }`
              : `${fretPositions[f] - 6}`
          }
          cy={`${stringPositions[i]}`}
          r="6"
          fill={
            f === 0
              ? "var(--fretboard_circle_default)"
              : "var(--fretboard_circle_selected)"
          }
          stroke={"var(--fretboard_circle_stroke)"}
        />
      );
    }
    return true;
  });

  return (
    <div className="fret-markers">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${fbSize.width} ${fbSize.height}`}
        width={`${fbSize.width}`}
        height={`${fbSize.height}`}
        onClick={() => {
          updateCurrFrets(string, fret);
        }}
        onMouseMove={showMarker}
        onMouseLeave={hideMarker}
      >
        {fretMarkers}
        {string > -1 && fretMarker}
      </svg>
    </div>
  );
};
