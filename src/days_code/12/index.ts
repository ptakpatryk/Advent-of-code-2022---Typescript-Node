import fs from 'fs';
import { cloneDeep } from 'lodash';

const FILE_PATH = 'public/day_12_input.txt';

const GRID = getMap();

export const partOne = () => {

  let start = '0,0';
  let end = '0,0';

  for (let rowIndex = 0; rowIndex < GRID.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < GRID[0].length; columnIndex++) {
      const current = GRID[rowIndex][columnIndex];
      if (current === 'S') {
        start = [rowIndex, columnIndex].join(',');
      } else if (current === 'E') {
        end = [rowIndex, columnIndex].join(',');
      }
    }
  }

  return bfs(start, end)
}

export const partTwo = () => {

  let starts = ['0,0'];
  let end = '0,0';

  for (let rowIndex = 0; rowIndex < GRID.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < GRID[0].length; columnIndex++) {
      const current = GRID[rowIndex][columnIndex];
      if (current === 'S' || current === 'a') {
        starts.push([rowIndex, columnIndex].join(','));
      } else if (current === 'E') {
        end = [rowIndex, columnIndex].join(',');
      }
    }
  }

  const results = starts.map(start => {
    return bfs(start, end)
  }).sort((a, b) => {
    if (a && b) {
      return a - b;
    } else {
      return - 1
    }
  })

  return results[0]
}


function bfs(start: string, end: string) {
  const visited = new Set();
  const queue = [[start, 0]];

  while (queue.length > 0) {
    const current = queue.shift() as [string, number];
    const currentMove = current[0].split(',').map(el => parseInt(el)) as [number, number];
    const possibleMoves = getPossibleMoves(...currentMove).map(el => el.join(','))

    for (const move of possibleMoves) {
      if (move === end) {
        return current[1] + 1;
      }

      if (!visited.has(move)) {
        visited.add(move);
        queue.push([move, current[1] + 1]);
      }
    }
  }
}

function getPossibleMoves(rowI: number, colI: number) {
  const neighbours = [
    [rowI - 1, colI], // top
    [rowI, colI + 1], // right
    [rowI + 1, colI], // down
    [rowI, colI - 1], // left
  ].filter(cords => {
    return (cords[0] >= 0 || cords[1] >= 0)
      && GRID?.[cords[0]]?.[cords[1]]
      && canMove(GRID[rowI][colI], GRID[cords[0]][cords[1]])
  })

  return neighbours;
}

function canMove(from: string, to: string) {
  if (from === 'S') {
    from = 'a'
  }
  if (to === 'E') {
    to = 'z'
  }

  if (from.toLowerCase() !== from || to.toLowerCase() !== to) {
    return false;
  }

  if (to.charCodeAt(0) - from.charCodeAt(0) <= 1) {
    return true;
  }

  return false;
}

export function getMap() {
  const gridFile = fs.readFileSync(FILE_PATH, 'utf8');

  return gridFile.split('\n').filter(Boolean).map(row => row.split(''));
}
