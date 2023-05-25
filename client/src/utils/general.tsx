import { CHORD_TYPE } from "../pages/createSong";

export function deepCloneChords(inputChords: CHORD_TYPE[]) {
  const clonedChords: CHORD_TYPE[] = [];

  inputChords.forEach((chordSet, i) => {
    const clonedChordArr: number[] = [];

    chordSet.chordArr.forEach((note) => {
      clonedChordArr.push(note);
    });
    let chordObj: CHORD_TYPE = {
      chordArr: clonedChordArr,
      chordName: chordSet.chordName,
      chordId: chordSet.chordId,
    };
    clonedChords.push(chordObj);
  });

  return clonedChords;
}
