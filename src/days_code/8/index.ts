import fs from 'fs';

const FILE_PATH = 'public/day_8_input.txt';

export const partOne = () => {
  const grid = getGrid();

  const gridHeight = grid.length;
  const gridLenght = grid[0].length;
  const outerTrees = (gridHeight * 2) + (gridLenght * 2) - 4;

  let visibleTrees = 0;

  for (let row = 1; row < gridHeight - 1; row++) {
    for (let column = 1; column < gridLenght - 1; column++) {
      if (isVisible(grid, row, column)) {
        visibleTrees++;
      }
    }
  }

  return visibleTrees + outerTrees;
};

export const partTwo = () => {
  const grid = getGrid();

  const gridHeight = grid.length;
  const gridLenght = grid[0].length;

  let highestScenicScore = 0;

  for (let row = 1; row < gridHeight - 1; row++) {
    for (let column = 1; column < gridLenght - 1; column++) {
      const treeScore = getScenicScore(grid, row, column);
      if (treeScore > highestScenicScore) {
        highestScenicScore = treeScore;
      }
    }
  }

  return highestScenicScore;
};


function isVisible(grid: number[][], rowIndex: number, columnIndex: number) {
  const numberToCompare = grid[rowIndex][columnIndex];
  const row = grid[rowIndex];

  const visibleRight = () => isHighest(getNumsAfter(row, columnIndex), numberToCompare);
  const visibleLeft = () => isHighest(getNumsBefore(row, columnIndex), numberToCompare);

  if (visibleLeft() || visibleRight()) {
    return true;
  }

  const column = grid.map(row => row[columnIndex]);

  const visibleTop = () => isHighest(getNumsBefore(column, rowIndex), numberToCompare);
  const visibleBottom = () => isHighest(getNumsAfter(column, rowIndex), numberToCompare);

  if (visibleTop() || visibleBottom()) {
    return true;
  }

  return false;
}

function isHighest(line: number[], numToCompare: number) {
  const highestInLine = line.sort(sortDesc)[0];

  return numToCompare > highestInLine;
}

function getScenicScore(grid: number[][], rowIndex: number, columnIndex: number) {
  const treeSize = grid[rowIndex][columnIndex];
  const row = grid[rowIndex];
  const column = grid.map(row => row[columnIndex]);

  const right = getSmallerTrees(getNumsAfter(row, columnIndex), treeSize) || 1;
  const left = getSmallerTrees(getNumsBefore(row, columnIndex).reverse(), treeSize) || 1;
  const top = getSmallerTrees(getNumsBefore(column, rowIndex).reverse(), treeSize) || 1;
  const bottom = getSmallerTrees(getNumsAfter(column, rowIndex), treeSize) || 1;

  return left * right * top * bottom;
}

function getNumsBefore(line: number[], pointer: number) {
  return line.slice(0, pointer);
}

function getNumsAfter(line: number[], pointer: number) {
  return line.slice(pointer + 1);
}

function getSmallerTrees(treeLine: number[], treeSize: number) {
  let numbersOfTree = 0;

  for (const num of treeLine) {
    if (num < treeSize) {
      numbersOfTree++;
    } else if (num >= treeSize) {
      return ++numbersOfTree;
    }
  }

  return numbersOfTree;
}

function getGrid() {
  const gridFile = fs.readFileSync(FILE_PATH, 'utf8');

  return gridFile.split('\n').filter(Boolean).map(row => row.split('').map(el => parseInt(el)));
}

function sortDesc(a: number, b: number) {
  return b - a;
}
