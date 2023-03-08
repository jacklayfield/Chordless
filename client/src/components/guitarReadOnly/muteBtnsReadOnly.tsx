import React from "react";

interface FPROPS {
  frets: number[];
  miniFlag: boolean;
}

export const MuteBtnsReadOnly: React.FC<FPROPS> = ({ frets, miniFlag }) => {
  return (
    <div className={miniFlag === false ? "mute-btns" : "mute-btns"}>
      {frets.map((fret, i) => {
        const isChecked = fret < 0 || Object.is(fret, -0);

        return (
          <div key={i} className="mute-btn">
            <input type="checkbox" checked={isChecked} readOnly />

            <label
              className={miniFlag === false ? "read-only" : "read-only mini"}
            ></label>
          </div>
        );
      })}
    </div>
  );
};
