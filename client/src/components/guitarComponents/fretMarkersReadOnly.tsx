import React, { useState } from "react";
import {
  fbSize,
  fretPositions,
  stringPositions,
} from "../../utils/fretboardValues";

interface FPROPS {
  frets: number[];
}

export const FretMarkersReadOnly: React.FC<FPROPS> = ({ frets }) => {
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
              ? `${
                  fretPositions[f] -
                  0.5 * (fretPositions[f] - fretPositions[f - 1])
                }`
              : `${fretPositions[f] - 6}`
          }
          cy={`${stringPositions[i]}`}
          r="6"
          fill={f === 0 ? "#000" : "rgba(255,255,255,0.5)"}
          stroke={f === 0 ? "#fff" : "#fff"}
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
      >
        {/* {string > -1 && fretMarker} */}
        {fretMarkers}
      </svg>
    </div>
  );
};
