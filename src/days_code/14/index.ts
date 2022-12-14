import fs from 'fs';

const FILE_PATH = 'public/day_14_input.txt';


type Coord = [number, number];
const CAVE_STONES = getCave()

const LOWEST_POINT = Array.from(CAVE_STONES)
  .map(el => el.split(',')
    .map(el => parseInt(el)) as Coord)
  // Sort by lowest Y cord to get lowest possible stone
  .sort((cordA, cordB) => cordB[1] - cordA[1])[0][1]

const SAND_START: Coord = [500, 0];

export const partOne = () => {
  const sandRestingUnits = new Set<string>();
  let currentSandUnitPosition: Coord = [...SAND_START];

  while (currentSandUnitPosition[1] < LOWEST_POINT) {
    const possibleMoves = getPossibleMoves(currentSandUnitPosition)
      .filter(el => canMove(el, new Set([...CAVE_STONES, ...sandRestingUnits])))

    // Sand has no way to move any more and need to rest
    if (possibleMoves.length === 0) {
      sandRestingUnits.add(currentSandUnitPosition.join(','))
      currentSandUnitPosition = [...SAND_START]
      continue;
    }

    // make move
    currentSandUnitPosition = possibleMoves[0];
  }

  return sandRestingUnits.size;
}

export const partTwo = () => {
  const occupied = new Set<string>(CAVE_STONES);
  let spawnedSands = 0;
  const path = [];
  let currentSandUnitPosition: Coord = [...SAND_START];

  while (!occupied.has(SAND_START.join(','))) {
    const possibleMoves = getPossibleMoves(currentSandUnitPosition)
      .filter(el => canMove(el, occupied, LOWEST_POINT + 2))

    // Sand has no way to move any more and need to rest
    if (possibleMoves.length === 0) {
      occupied.add(currentSandUnitPosition.join(','))
      currentSandUnitPosition = path.length > 0 ? path.pop() as Coord : [...SAND_START];
      spawnedSands++;
      continue;
    }

    // make move
    path.push(currentSandUnitPosition)
    currentSandUnitPosition = possibleMoves[0];
  }

  return spawnedSands;
}


function getPossibleMoves(coord: Coord): Coord[] {
  const [x, y] = coord;
  return [
    // down
    [x, y + 1],
    // down-left
    [x - 1, y + 1],
    // down-right
    [x + 1, y + 1]
  ]
}

function canMove(direction: Coord, blockedMoves: Set<string>, bottomLine?: number) {
  const blockedByWallsOrSand = !blockedMoves.has(direction.join(','));

  if (!bottomLine) {
    return blockedByWallsOrSand;
  } else {
    return blockedByWallsOrSand && direction[1] !== bottomLine
  }
}

export function getCave() {
  const file = fs.readFileSync(FILE_PATH, 'utf8');
  const stones = new Set<string>();

  const lineCords = file
    .split('\n')
    .filter(Boolean)
    .map(line => (line.split(' -> ')
      .map(cord => (
        cord.split(',').map(el => parseInt(el)) as Coord
      ))
    ));

  lineCords.forEach(coords => {
    for (let i = 0; i < coords.length - 1; i++) {
      const [x1, y1] = coords[i];
      const [x2, y2] = coords[i + 1];

      if (x1 === x2) {
        // Draw vertical line
        let current = y1 < y2 ? y1 : y2;
        const end = y1 > y2 ? y1 : y2;

        while (current <= end) {
          stones.add([x1, current].join(','))
          current++;
        }
      } else if (y1 === y2) {
        // Draw horizontal line
        let current = x1 < x2 ? x1 : x2;
        const end = x1 > x2 ? x1 : x2;

        while (current <= end) {
          stones.add([current, y1].join(','))
          current++;
        }
      } 
    }
  })

  return stones;
}
