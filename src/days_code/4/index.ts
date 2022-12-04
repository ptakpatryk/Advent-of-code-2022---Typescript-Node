import fs from 'fs';
import { argv0 } from 'process';
import readline from 'readline';

const FILE_PATH = 'public/day_4_input.txt';

export const partOne = () => {
  const file = getFileInterface();

  return new Promise<number>(res => {
    let containingCount = 0;

    file.on('line', line => {
      const [firstElf, secondElf] = line.split(',').map(getSectors);
      if (rangeContainEachOther(firstElf, secondElf)) {
        containingCount++;
      }
    });

    file.on('close', () => res(containingCount));
  });
};

export const partTwo = () => {
  const file = getFileInterface();

  return new Promise<number>(res => {
    let overlappingCount = 0;

    file.on('line', line => {
      const [firstElf, secondElf] = line.split(',').map(getSectors);
      if (rangeOverlapEachOther(firstElf, secondElf)) {
        overlappingCount++;
      }
    });

    file.on('close', () => res(overlappingCount));
  });
};


function getFileInterface() {
  return readline.createInterface({
    input: fs.createReadStream(FILE_PATH),
  });
}

function getSectors(sectorsRange: string) {
  const [start, end] = sectorsRange.split('-').map(num => parseInt(num));
  const range = [];

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
}

function rangeContainEachOther(rangeOne: number[], rangeTwo: number[]) {
  // first contains the 2nd
  if ((rangeOne[0] <= rangeTwo[0] && rangeOne[rangeOne.length - 1] >= rangeTwo[rangeTwo.length - 1]) ||
    (rangeTwo[0] <= rangeOne[0] && rangeTwo[rangeTwo.length - 1] >= rangeOne[rangeOne.length - 1])
  ) {
    return true;
  }
  return false;
}

function rangeOverlapEachOther(rangeOne: number[], rangeTwo: number[]) {
  if (rangeOne.some(num=> rangeTwo.includes(num))) {
    return true;
  }
  return false;
}
