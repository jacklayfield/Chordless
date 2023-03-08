const fbSize = {
  width: 830,
  height: 108,
  widthMini: 580,
  heightMini: 84,
};

const createStringPositions = (h: number) => {
  return Array(6)
    .fill(0)
    .map((s, i) => ((5.5 - i) * h) / 6);
};

const createFretPositions = (w: number) => {
  const frets = 20;
  const dMax = 0.95;

  const scaleLen = dMax / (1 - Math.pow(2, -(frets + 1) / 12));

  const perc = Array(frets + 1)
    .fill(0)
    .map((d, n) => scaleLen * (1 - Math.pow(2, -(n + 1) / 12)));

  return perc.map((f) => f * w);
};

const stringPositions = createStringPositions(fbSize.height);
const fretPositions = createFretPositions(fbSize.width);
const stringPositionsMini = createStringPositions(fbSize.heightMini);
const fretPositionsMini = createFretPositions(fbSize.widthMini);

export {
  fbSize,
  stringPositions,
  fretPositions,
  stringPositionsMini,
  fretPositionsMini,
};
