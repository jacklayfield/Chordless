import { AxiosError } from "axios";
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

  console.log("deep clone made");

  return clonedChords;
}

export function isForbidden(res: any) {
  return `${(res as AxiosError)?.response?.status}` === "403";
}
