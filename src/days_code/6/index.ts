import fs from 'fs';

const FILE_PATH = 'public/day_6_input.txt';

export const partOne = () => {
  const signal = getSignal();

  for (let i = 4; i <= signal.length; i++) {
    const markerSlice = signal.slice(i - 4, i);

    if (areLettersUnique(markerSlice)) {
      return i;
    }
  }
};

export const partTwo = () => {
  const signal = getSignal();

  for (let i = 14; i <= signal.length; i++) {
    const markerSlice = signal.slice(i - 14, i);

    if (areLettersUnique(markerSlice)) {
      return i;
    }
  }
};

function getSignal() {
  return fs.readFileSync(FILE_PATH, 'utf8');
}

function areLettersUnique(letters: string) {
  const set = new Set(letters.split(''));

  return set.size === letters.length;
}
