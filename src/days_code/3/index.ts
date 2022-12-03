import fs from 'fs';
import readline from 'readline';

type IGroup = [string[], string[], string[]];

const FILE_PATH = 'public/day_3_input.txt';

const alphabet_lowercase = [...'abcdefghijklmnopqrstuvwxyz'] as const;
const alphabet_uppercase = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'] as const;
const scoreSet: Record<string, number> = {};

alphabet_lowercase.forEach((letter, index) => scoreSet[letter] = index + 1);
alphabet_uppercase.forEach((letter, index) => scoreSet[letter] = index + 27);


export const partOne = () => {
  const fileInterace = getFileInterface();

  return new Promise<number>((resolve) => {
    let score = 0;

    fileInterace.on('line', (line) => {
      const itemsArr = line.split('');

      const firstHalf = itemsArr.slice(0, itemsArr.length / 2);
      const secondHalf = itemsArr.slice(itemsArr.length / 2);

      const commonItem = getCommonItem(firstHalf, secondHalf);

      score += getScore(commonItem);
    });

    // resolve score
    fileInterace.on('close', () => resolve(score));
  });
};

export const partTwo = () => {
  const fileInterace = getFileInterface();

  return new Promise<number>((resolve) => {
    let score = 0;
    let lines: string[][] = [];

    fileInterace.on('line', (line) => {
      lines.push(line.split(''));

      if (lines.length === 3) {
        const groupBadge = getGroupBadge(lines as IGroup);
        score += getScore(groupBadge);
        lines = [];
      }
    });

    fileInterace.on('close', () => resolve(score));
  });
};

function getFileInterface() {
  return readline.createInterface({
    input: fs.createReadStream(FILE_PATH),
  });
}

function getGroupBadge(group: IGroup) {
  return group[0].find(item => group[1].includes(item) && group[2].includes(item));
}

function getScore(item: string | undefined) {
  if (item && scoreSet[item]) {
    return scoreSet[item];
  } else {
    return 0;
  }
}

function getCommonItem(firstHalf: string[], secondHalf: string[]) {
  return firstHalf.find(item => secondHalf.includes(item));
}
