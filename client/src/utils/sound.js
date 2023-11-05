import { guitar } from "./audiosynth.js";

function getNote(string, fret) {
  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const open = [4, 9, 14, 19, 23, 28];
  const index = open[string] + fret;
  const note = notes[index % 12];
  const octave = Math.floor(index / 12) + 2;
  return [note, octave];
}

function playNote(string, fret, soundNum) {
  const [note, octave] = getNote(string, fret);
  const duration = 1.5;
  console.log(note);
  guitar.play(soundNum, note, octave, duration);
}

function playGuitarBody(strings, frets, sound) {
  var soundNum = 2;

  switch (sound) {
    case "Piano":
      soundNum = 0;
      break;
    case "Organ":
      soundNum = 1;
      break;
    case "Acoustic":
      soundNum = 2;
      break;
    case "EDM":
      soundNum = 3;
      break;
  }

  frets.forEach((f, s) => strings.includes(s) && playNote(s, f, soundNum));
}

export { playGuitarBody };
