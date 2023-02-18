export function findChord(arr: number[]) {
  const arrCopy = [...arr];
  const arrCopyReversed = arrCopy.reverse();

  // Setting any muted string to -1 to keep just one value for mutes strings
  for (let i = 0; i < arrCopyReversed.length; i++) {
    if (arrCopyReversed[i] < 0 || Object.is(arrCopyReversed[i], -0)) {
      arrCopyReversed[i] = -1;
    }
  }

  const chordStr = arrCopyReversed.toString();

  const chordMap = new Map([
    ["-1,0,2,2,2,0", "A"],
    ["0,0,2,2,2,0", "~A"],
    ["-1,0,2,1,2,0", "Amaj7"],
    ["0,0,2,1,2,0", "~Amaj7"],
    ["-1,0,2,0,2,0", "A7"],
    ["0,0,2,0,2,0", "~A7"],
    ["-1,0,2,2,1,0", "Am"],
    ["0,0,2,2,1,0", "~Am"],
    ["-1,0,2,0,1,0", "Am7"],
    ["0,0,2,0,1,0", "~Am7"],
    ["-1,-1,4,4,4,2", "B"],
    ["0,0,4,4,4,2", "~B"],
    ["2,2,1,3,0,-1", "Bmaj7"],
    ["2,2,1,3,0,0", "~Bmaj7"],
    ["-1,2,1,2,0,2", "B7"],
    ["-1,2,1,2,0,2", "~B7"],
    ["-1,-1,4,4,3,2", "Bm"],
    ["0,0,4,4,3,2", "~Bm"],
    ["-1,2,0,2,0,2", "Bm7"],
    ["0,2,0,2,0,2", "~Bm7"],
    ["x,x,x,x,x,x", "X"],
  ]);

  return chordMap.get(chordStr);
}
