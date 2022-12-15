import { getFileInterface } from '../../utils';

const FILE_PATH = 'public/day_15_input.txt';
type Coords = [number, number];

type Verticles = {
  top: Coords,
  right: Coords,
  bottom: Coords,
  left: Coords
}

type SignalCoords = {
  center: Coords,
} & Verticles;

export const partOne = () => {
  const file = getFileInterface(FILE_PATH);
  const signalFields: SignalCoords[] = [];
  const beacons: Coords[] = [];

  return new Promise((resolve) => {

    file.on('line', line => {
      const [sensorCoords, beaconCoords] = parseInputLine(line);
      const [sx, sy] = sensorCoords;
      const [bx, by] = beaconCoords;

      const radius = Math.abs(sx - bx) + Math.abs(sy - by);

      beacons.push(beaconCoords);
      signalFields.push({
        center: sensorCoords,
        ...getVertices(sensorCoords, radius)
      });

    });

    file.on('close', () => {
      const SEARCH_ROW = 2000000;
      // Get all signals that reach searched row 
      const overlappingSignals = signalFields.filter(signal => {
        return signal.top[1] < SEARCH_ROW && signal.bottom[1] > SEARCH_ROW;
      });

      const xCoords = overlappingSignals.map(signal => {
        let signalWidth = 0;
        if (signal.center[1] > SEARCH_ROW) {
          signalWidth = SEARCH_ROW - signal.top[1];
        } else {
          signalWidth = signal.bottom[1] - SEARCH_ROW;
        }

        return [signal.center[0] - signalWidth, signal.center[0] + signalWidth]; // from, to
      });

      const occupied = xCoords.flatMap(([startX, endX]) => {
        return Array(endX - startX + 1).fill(null).map((_, i) => startX + i);
      });

      const uniqueOccupied = new Set(occupied);
      // removes all beacons positioned in this row
      beacons
        .filter(beaconCoords => beaconCoords[1] === SEARCH_ROW)
        .map(beaconCoords => beaconCoords[0])
        .forEach(x => {
          uniqueOccupied.delete(x);
        });

      resolve(uniqueOccupied.size);
    });
  });

};

export const partTwo = () => {
  const file = getFileInterface(FILE_PATH);
  const signalFields: SignalCoords[] = [];
  const beacons: Coords[] = [];

  return new Promise((resolve) => {
    file.on('line', line => {
      const [sensorCoords, beaconCoords] = parseInputLine(line);
      const [sx, sy] = sensorCoords;
      const [bx, by] = beaconCoords;

      const radius = Math.abs(sx - bx) + Math.abs(sy - by);

      beacons.push(beaconCoords);
      signalFields.push({
        center: sensorCoords,
        ...getVertices(sensorCoords, radius)
      });

    });

    file.on('close', () => {
      const UPPER_RANGE = 4000000;

      for (let y = 0; y <= UPPER_RANGE; y++) {
        const x = getRowWithOneSlot(y, signalFields, UPPER_RANGE);

        if (!x) {
          continue;
        }

        const result = x * UPPER_RANGE + y;
        resolve(result);
      }
    });
  });
};

function getRowWithOneSlot(searchRow: number, signalFields: SignalCoords[], upperRange: number) {
  // Get all signals that reach searched row 
  const overlappingSignals = signalFields.filter(signal => {
    return signal.top[1] < searchRow && signal.bottom[1] > searchRow && signal.left[0] <= upperRange && signal.right[0] > 0;
  });

  const xCoords = overlappingSignals.map(signal => {
    let signalWidth = 0;
    if (signal.center[1] > searchRow) {
      signalWidth = searchRow - signal.top[1];
    } else {
      signalWidth = signal.bottom[1] - searchRow;
    }

    const start = signal.center[0] - signalWidth;
    const end = signal.center[0] + signalWidth;

    return [start < 0 ? 0 : start, end > upperRange ? upperRange : end]; // from, to
  });

  const sortedXCoords = xCoords.sort((a, b) => a[0] - b[0]);

  let occupied = [...sortedXCoords[0]];

  for (let i = 0; i < sortedXCoords.length; i++) {
    if (sortedXCoords[i][0] > occupied[1] + 1) {
      return occupied[1] + 1;
    } else if (sortedXCoords[i][1] > occupied[1]) {
      occupied = [occupied[0], sortedXCoords[i][1]];
    }
  }
}

function getVertices(center: Coords, radius: number): Verticles {
  const [x, y] = center;

  return {
    top: [x, y - radius],
    bottom: [x, y + radius],
    left: [x - radius, y],
    right: [x + radius, y]
  };
}

/* Sensor at x=2, y=18: closest beacon is at x=-2, y=15 */
function parseInputLine(line: string) {
  const linesByDevice = line.split(':'); // ['Sensor at x=2, y=18:', 'closest beacon is at x=-2, y=15']

  return linesByDevice.map(part => {
    const coordsStart = part.indexOf('x');
    return part.slice(coordsStart).split(', ')
      .map(coord => parseInt(coord.slice(2)));
  }) as [Coords, Coords];

}
