import { CHORD_TYPE } from "../components/songBuilder";

export function deepCloneChords(inputChords: CHORD_TYPE[]) {
  const clonedChords: CHORD_TYPE[] = [];

  inputChords.map((chordSet, i) => {
    const clonedChordArr: number[] = [];

    chordSet.chordArr.map((note) => {
      clonedChordArr.push(note);
    });
    let chordObj: CHORD_TYPE = {
      chordArr: clonedChordArr,
      chordName: JSON.parse(JSON.stringify(chordSet.chordName)),
    };
    clonedChords.push(chordObj);
  });

  console.log("deep clone made");

  return clonedChords;
}
