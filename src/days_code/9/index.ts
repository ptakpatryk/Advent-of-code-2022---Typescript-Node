import { getFileInterface } from '../../utils';

const FILE_PATH = 'public/day_9_input.txt';

type IPosition = [number, number];
type IDirection = 'R' | 'L' | 'U' | 'D';

export const partOne = () => {
  const file = getFileInterface(FILE_PATH);

  let tail: IPosition = [0, 0];
  let head: IPosition = [0, 0];
  let visitedTailPosition = registerPosition(tail, new Map());

  return new Promise(resolve => {
    file.on('line', line => {
      const [direction, steps] = parseLine(line);
      for (let i = 0; i < steps; i++) {
        head = movePoint(direction, head);
        if (!arePointsTouching(head, tail)) {
          tail = moveTowardPoint(tail, head);
          visitedTailPosition = registerPosition(tail, visitedTailPosition);
        }
      }
    });

    file.on('close', () => {
      resolve(visitedTailPosition.size);
    });
  });
};

export const partTwo = () => {
  const file = getFileInterface(FILE_PATH);

  const tails: IPosition[] = Array(9).fill([0, 0]);
  let head: IPosition = [0, 0];
  let visitedTailPosition = registerPosition(tails[tails.length - 1], new Map());

  return new Promise((resolve) => {
    file.on('line', line => {
      const [direction, steps] = parseLine(line);

      for (let i = 0; i < steps; i++) {
        head = movePoint(direction, head);

        for (let t = 0; t < tails.length; t++) {
          const toCompare: IPosition = t === 0 ? [...head] : [...tails[t - 1]];
          if (!arePointsTouching(toCompare, tails[t])) {
            tails[t] = moveTowardPoint(tails[t], toCompare);
            visitedTailPosition = registerPosition(tails[tails.length - 1], visitedTailPosition);
          }
        }
      }
    });

    file.on('close', () => {
      resolve(visitedTailPosition.size);
    });
  });
};


function registerPosition(move: IPosition, historyState: Map<string, number>) {
  const history = new Map(historyState);
  const moveStr = move.join(',');

  if (history.has(moveStr)) {
    const occurencies = history.get(moveStr);
    history.set(moveStr, occurencies ? occurencies + 1 : 1);
  } else {
    history.set(moveStr, 1);
  }

  return history;
}

function movePoint(direction: IDirection, point: IPosition): IPosition {
  switch (direction) {
  case 'R':
    return [point[0] + 1, point[1]];
  case 'L':
    return [point[0] - 1, point[1]];
  case 'U':
    return [point[0], point[1] + 1];
  case 'D':
    return [point[0], point[1] - 1];
  }
}

function arePointsTouching(pointOne: IPosition, pointTwo: IPosition) {
  const [x1, y1] = pointOne;
  const [x2, y2] = pointTwo;

  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  return distance < 2;
}

function moveTowardPoint(pointOne: IPosition, pointTwo: IPosition) {
  // [0, 0], [2, 0]
  const startingPoint: IPosition = [...pointOne];
  const [x1, y1] = pointOne;
  const [x2, y2] = pointTwo;

  if (x1 === x2) {
    startingPoint[1] = moveOneStep(y1, y2);
  } else if (y1 === y2) {
    startingPoint[0] = moveOneStep(x1, x2);
  } else {
    startingPoint[0] = moveOneStep(x1, x2);
    startingPoint[1] = moveOneStep(y1, y2);
  }

  return startingPoint;
}

function moveOneStep(cordOne: number, cordTwo: number) {
  if (cordOne < cordTwo) {
    return ++cordOne;
  }

  return --cordOne;
}

function parseLine(line: string) {
  return line.split(' ').map(el => {
    return isNaN(parseInt(el)) ? el : parseInt(el);
  }) as [IDirection, number];
}
