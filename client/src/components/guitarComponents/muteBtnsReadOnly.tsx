import React from "react";

interface FPROPS {
  frets: number[];
}

export const MuteBtnsReadOnly: React.FC<FPROPS> = ({ frets }) => {
  return (
    <div className="mute-btns">
      {frets.map((fret, i) => {
        const isChecked = fret < 0 || Object.is(fret, -0);

        return (
          <div key={i} className="mute-btn">
            <input type="checkbox" checked={isChecked} readOnly />

            <label className="read-only"></label>
          </div>
        );
      })}
    </div>
  );
};
