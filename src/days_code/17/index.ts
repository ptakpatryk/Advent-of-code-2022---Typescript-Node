import fs from 'fs';

const FILE_PATH = 'public/day_17_input.txt';
const PATTERN = fs.readFileSync(FILE_PATH, 'utf8').split('').filter(el => el === '<' || el === '>');

type IDirection = '<' | '>'  | 'v'
type IRock = [number, number][];

export const partOne = () => {
  let tunnel = new Set<string>();
  const pattern = PATTERN;
  let moveCount = 0;
  let height = -1;

  for(let i = 0; i < 2022; i++) {
    let settled = false;
    let currentRock = spawnRock(i, height);
    let rockMove = 0;

    while(!settled) {
      const move = pattern[moveCount % pattern.length] as IDirection;
      // move sideways
      let newPosition = moveRock(currentRock, move);
      moveCount++;

      if(rockMove < 1 || canMoveHorizontaly(newPosition, tunnel)) {
        currentRock = newPosition;
      } 
      rockMove++;
      // move down
      newPosition = moveRock(currentRock, 'v');

      if(isOverlapping(newPosition, tunnel)) {
        settled = true;
        continue;
      }

      currentRock = newPosition;
    }

    currentRock.forEach(coord => {
      tunnel.add(coord.join(','));
    });

    const heighestRockPoint = currentRock.sort((coordA, coordB) => coordB[1] - coordA[1])[0][1];
    if(heighestRockPoint > height) {
      height = heighestRockPoint;
    }

    // TUNNEL CLEANUP
    if(i % 50 === 0) {
      const tunnelArr = Array.from(tunnel).map(el => el.split(',').map(el => parseInt(el))) as [number, number][];
      const rowScanMap = new Map<number, boolean>();
      let heightWithFullRow = -1;
      for(let i = height; i > 1; i--) {
        const row = tunnelArr.filter((( [, y] ) => y === i));
        // check 
        row.forEach(([x]) => {
          if(!rowScanMap.has(x)) {
            rowScanMap.set(x, true);
          }
        });

        if(rowScanMap.size === 6) {
          heightWithFullRow = i;
          rowScanMap.clear();
          continue;
        }
      }
      if(heightWithFullRow !== -1) {
        tunnel = new Set(tunnelArr.filter(([, y]) => y >= heightWithFullRow).map(el => el.join(',')));
      }
    }
  }

  return height + 1;
};

function isOverlapping(rock: IRock, tunnel: Set<string>) {
  // should settle because the ground
  if(rock.some(coord => coord[1] === -1)) {
    return true;
  }

  const rockStr = rock.map(coord => [coord].join(','));

  return rockStr.some(rockCoord => tunnel.has(rockCoord));
}

function canMoveHorizontaly(rock: IRock, tunnel: Set<string>) {
  if(rock.some(([x]) => x < 0 || x > 6)) {
    return false;
  }

  const heights = rock.map(coord => coord[1]);
  const sameHightElements = Array.from(tunnel).filter(coord => heights.includes(parseInt(coord.split(',')[1])));

  // Theres no elements on the same height as the rock
  if(!sameHightElements.length) return true;

  const rockStr = rock.map(coord => coord.join(','));

  // Check if point is being occupied
  return !rockStr.some(rockEl => {
    return sameHightElements.includes(rockEl);
  });}

function moveRock(rock: IRock, direction: IDirection): IRock {
  switch (direction) {
    case '<':
      return rock.map(([x, y]) => [x - 1, y]) as IRock;
    case '>':
      return rock.map(([x, y]) => [x + 1, y]) as IRock;
    case 'v':
      return rock.map(([x, y]) => [x, y - 1]);
    default:
      throw new Error('No such a direction.');
  }
}

function spawnRock(rockNumber: number, h: number) {
  const spawnFn = rockSpawners[rockNumber % 5];

  return spawnFn(h);
}

const rockSpawners = [spawnFirstRock, spawnSecondRock, spawnThirdRock, spawnFourthRock, spawnFifthRock];

function spawnFirstRock(h: number): IRock {
  return [[2, h + 4], [3, h + 4], [4, h + 4], [5, h + 4]];
}

function spawnSecondRock(h: number): IRock {
  return [[3, h + 6], [2, h + 5], [3, h + 5], [4, h + 5], [3, h + 4]];
}

function spawnThirdRock(h: number): IRock {
  return [[4, h + 6], [4, h + 5], [2, h + 4], [3, h + 4], [4, h + 4]];
}

function spawnFourthRock(h: number): IRock {
  return [[2, h + 7], [2, h + 6], [2, h + 5], [2, h + 4] ];
}

function spawnFifthRock(h: number): IRock {
  return [[2, h + 5], [3, h + 5], [2, h + 4], [3, h + 4] ];
}


// ####
// 
// .#.
// ###
// .#.
// 
// ..#
// ..#
// ###
// 
// #
// #
// #
// #
// 
// ##
// ##
