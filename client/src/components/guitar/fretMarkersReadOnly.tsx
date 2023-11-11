import React, { useState } from "react";
import {
  fbSize,
  fretPositions,
  stringPositions,
  fretPositionsMini,
  stringPositionsMini,
} from "../../utils/fretboardValues";

interface FPROPS {
  frets: number[];
  miniFlag: boolean;
}

export const FretMarkersReadOnly: React.FC<FPROPS> = ({ frets, miniFlag }) => {
  const isMuted = (fret: number) => {
    return fret < 0 || Object.is(fret, -0);
  };

  const fretMarkers = frets.map((f, i) => {
    if (!isMuted(f)) {
      return (
        <circle
          key={i}
          cx={
            f > 0
              ? miniFlag === false
                ? `${
                    fretPositions[f] -
                    0.5 * (fretPositions[f] - fretPositions[f - 1])
                  }`
                : `${
                    fretPositionsMini[f] -
                    0.5 * (fretPositionsMini[f] - fretPositionsMini[f - 1])
                  }`
              : miniFlag === false
              ? `${fretPositions[f] - 6}`
              : `${fretPositionsMini[f] - 6}`
          }
          cy={
            miniFlag === false
              ? `${stringPositions[i]}`
              : `${stringPositionsMini[i]}`
          }
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
        viewBox={
          miniFlag === false
            ? `0 0 ${fbSize.width} ${fbSize.height}`
            : `0 0 ${fbSize.widthMini} ${fbSize.heightMini}`
        }
        width={miniFlag === false ? `${fbSize.width}` : `${fbSize.widthMini}`}
        height={
          miniFlag === false ? `${fbSize.height}` : `${fbSize.heightMini}`
        }
      >
        {/* {string > -1 && fretMarker} */}
        {fretMarkers}
      </svg>
    </div>
  );
};
