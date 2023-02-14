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
      cx={`${fretPositions[fret] - 6}`}
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
          cx={`${fretPositions[f] - 6}`}
          cy={`${stringPositions[i]}`}
          r="6"
          fill="rgba(255,255,255,0.5)"
          stroke="#fff"
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
        onMouseMove={showMarker}
        onMouseLeave={hideMarker}
        onClick={() => {
          updateCurrFrets(string, fret);
        }}
      >
        {string > -1 && fretMarker}
        {fretMarkers}
      </svg>
    </div>
  );
};
