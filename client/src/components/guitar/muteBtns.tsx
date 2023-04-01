import React from "react";

interface FPROPS {
  currFrets: number[];
  updateCurrFrets: Function;
  // Identification for mapping list of mutable chords.
  // Only relevant for "edit chords" display.
  chordIdentifier: number;
}

export const MuteBtns: React.FC<FPROPS> = ({
  currFrets,
  updateCurrFrets,
  chordIdentifier,
}) => {
  return (
    <div className="mute-btns">
      {currFrets.map((fret, i) => {
        const isChecked = fret < 0 || Object.is(fret, -0);

        return (
          <div key={String(chordIdentifier) + String(i)} className="mute-btn">
            <input
              id={`mute-${String(chordIdentifier) + String(i)}`}
              type="checkbox"
              checked={isChecked}
              onChange={() => updateCurrFrets(i)}
            />
            <label
              htmlFor={`mute-${String(chordIdentifier) + String(i)}`}
            ></label>
          </div>
        );
      })}
    </div>
  );
};
