import React from "react";

interface FPROPS {
  currFrets: number[];
  updateCurrFrets: Function;
}

export const MuteBtns: React.FC<FPROPS> = ({ currFrets, updateCurrFrets }) => {
  return (
    <div className="mute-btns">
      {currFrets.map((fret, i) => {
        const isChecked = fret < 0 || Object.is(fret, -0);

        return (
          <div key={i} className="mute-btn">
            <input
              id={`mute-${i}`}
              type="checkbox"
              checked={isChecked}
              onChange={() => updateCurrFrets(i)}
            />
            <label htmlFor={`mute-${i}`}></label>
          </div>
        );
      })}
    </div>
  );
};
