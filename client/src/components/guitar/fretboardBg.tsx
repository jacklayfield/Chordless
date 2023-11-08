import React from "react";
import {
  fbSize,
  fretPositions,
  stringPositions,
  fretPositionsMini,
  stringPositionsMini,
} from "../../utils/fretboardValues";

interface FPROPS {
  miniFlag: boolean;
}

export const FretboardBg: React.FC<FPROPS> = ({ miniFlag }) => {
  const strings = (
    miniFlag === false ? stringPositions : stringPositionsMini
  ).map((pos, i) => {
    return (
      <line
        key={`string-${i}`}
        id={`string-${i}`}
        x1="0"
        y1={pos}
        x2={miniFlag === false ? fbSize.width : fbSize.widthMini}
        y2={pos}
        stroke="#000"
        strokeWidth="2"
      />
    );
  });

  const frets = (miniFlag === false ? fretPositions : fretPositionsMini).map(
    (pos, i) => {
      return (
        <line
          key={`fret-${i}`}
          id={`fret-${i}`}
          x1={pos}
          y1="0"
          x2={pos}
          y2={miniFlag === false ? fbSize.height : fbSize.heightMini}
          stroke="#b93"
          strokeWidth="3"
        />
      );
    }
  );
  const nut = (
    <rect
      x="0"
      y="0"
      width={miniFlag === false ? fretPositions[0] : fretPositionsMini[0]}
      height={miniFlag === false ? fbSize.height : fbSize.heightMini}
      fill="rgba(0,0,0,0.5)"
    />
  );

  const dotFrets = [3, 5, 7, 9, 12, 15, 17, 19];

  const dots = dotFrets.map((fret, i) => {
    if (fret === 12) {
      return (
        <g key={`dot-${fret}`} id={`dots-${fret}`}>
          <circle
            cx={
              miniFlag === false
                ? (fretPositions[fret] + fretPositions[fret - 1]) / 2
                : (fretPositionsMini[fret] + fretPositionsMini[fret - 1]) / 2
            }
            cy={
              miniFlag === false
                ? (2 * fbSize.height) / 6
                : (2 * fbSize.heightMini) / 6
            }
            r="3"
            fill="#a98"
          />
          <circle
            cx={
              miniFlag === false
                ? (fretPositions[fret] + fretPositions[fret - 1]) / 2
                : (fretPositionsMini[fret] + fretPositionsMini[fret - 1]) / 2
            }
            cy={
              miniFlag === false
                ? (4 * fbSize.height) / 6
                : (4 * fbSize.heightMini) / 6
            }
            r="3"
            fill="#a98"
          />
        </g>
      );
    }
    return (
      <circle
        key={`dot-${fret}`}
        id={`dot-${fret}`}
        cx={
          miniFlag === false
            ? (fretPositions[fret] + fretPositions[fret - 1]) / 2
            : (fretPositionsMini[fret] + fretPositionsMini[fret - 1]) / 2
        }
        cy={miniFlag === false ? fbSize.height / 2 : fbSize.heightMini / 2}
        r="3"
        fill="#a98"
      />
    );
  });

  return (
    <div className="fretboard-bg">
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
        {nut}
        {frets}
        {strings}
        {dots}
      </svg>
    </div>
  );
};
