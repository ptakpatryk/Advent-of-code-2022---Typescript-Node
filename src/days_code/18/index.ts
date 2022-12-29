import { getFileInterface } from '../../utils';

const FILE_PATH = 'public/day_18_input.txt';

type ICoords = [number, number, number];
type IBoundries = {
  xMax: number,
  xMin: number,
  yMax: number,
  yMin: number,
  zMax: number,
  zMin: number,
}

export const partOne = () => {
  const file = getFileInterface(FILE_PATH);
  const grid = new Set<string>();
  let sides = 0;

  return new Promise(resolve => {
    file.on('line', line => {
      const droplet = parseLine(line);
      let dropletUncoveredSides = 6;
      for(const neighbour of getNeighbours(droplet)) {
        if(grid.has(neighbour)) {
          dropletUncoveredSides -= 2;
        }
      }
      sides += dropletUncoveredSides;
      grid.add(droplet.join(','));

    });

    file.on('close', () => {
      resolve(sides);
    });
  });
};

export const partTwo = () => {
  const file = getFileInterface(FILE_PATH);
  const grid = new Set<string>();
  let sides = 0;

  return new Promise(resolve => {

    file.on('line', line => {
      const droplet = parseLine(line);
      let dropletUncoveredSides = 6;
      for(const neighbour of getNeighbours(droplet)) {
        if(grid.has(neighbour)) {
          dropletUncoveredSides -= 2;
        }
      }
      sides += dropletUncoveredSides;
      grid.add(droplet.join(','));
    });

    file.on('close', () => {
      const airPocketCubes = new Set<string>();
      const openAirPocketCubes = new Set<string>();
      const gridArr = Array.from(grid).map(el => el.split(',').map(el => parseInt(el))) as ICoords[];

      const boundries: IBoundries = {
        xMax: Math.max(...gridArr.map(([x]) => x)),
        xMin: Math.min(...gridArr.map(([x]) => x)),
        yMax: Math.max(...gridArr.map(([,y]) => y)),
        yMin: Math.min(...gridArr.map(([,y]) => y)),
        zMax: Math.max(...gridArr.map(([,,z]) => z)),
        zMin: Math.min(...gridArr.map(([,,z]) => z)),
      };

      // Iterrate over each point within boundries
      for(let x = boundries.xMin; x <= boundries.xMax; x++) {
        for(let y = boundries.yMin; y <= boundries.yMax; y++) {
          for(let z = boundries.zMin; z <= boundries.zMax; z++) {
            // perform bfs to find out all adjacent empty cubes
            const point = [x, y, z];
            const visited = new Set<string>();
            visited.add(point.join(','));

            if(
              grid.has(point.join(',')) ||
                airPocketCubes.has(point.join(',')) ||
                openAirPocketCubes.has(point.join(','))
            ) {
              continue;
            }

            const queue = [point];

            while(queue.length) {
              const currentPoint = queue.pop() as ICoords;
              const neighbours = getNeighbours(currentPoint)
                .filter(point => !grid.has(point))
                .filter(point => isWithinBoundries(parsePoint(point), boundries));

              for(const neighbour of neighbours) {
                if(!visited.has(neighbour)) {
                  visited.add(neighbour);
                  queue.push(parsePoint(neighbour));
                }
              }
            }

            // check if visited cubes are on the boundries edge (if any of them is that means that scanned surface wasn't trapped air)
            if(Array.from(visited).some(point => isOnBoundriesEdge(parsePoint(point), boundries))) {
              Array.from(visited).forEach(visitedEl => openAirPocketCubes.add(visitedEl));
            } else {
              Array.from(visited).forEach(visitedEl => airPocketCubes.add(visitedEl));
            }

            visited.clear();
          }
        }
      }

      // For each airpocet cube find out if its direct neighbour is a droplet and if it is remove surface
      Array.from(airPocketCubes).forEach(airCube => {
        const neighbours = getNeighbours(parsePoint(airCube));
        for(const neighbour of neighbours) {
          if(grid.has(neighbour)) {
            sides--;
          }
        }
      });

      resolve(sides);
    });
  });
};


function isWithinBoundries(point: ICoords, boundries: IBoundries) {
  return (
    isWithinRange(point[0], boundries.xMin, boundries.xMax) &&
    isWithinRange(point[1], boundries.yMin, boundries.yMax) &&
    isWithinRange(point[2], boundries.zMin, boundries.zMax)
  );
}

function isOnBoundriesEdge(point: ICoords, boundries: IBoundries) {
  return (
    point[0] === boundries.xMin || point[0] === boundries.xMax ||
    point[1] === boundries.yMin || point[1] === boundries.yMax ||
    point[2] === boundries.zMin || point[2] === boundries.zMax 
  );
}

function parsePoint(point: string) {
  return point.split(',').map(el => parseInt(el)) as ICoords;
}

function isWithinRange(num: number, rangeMin: number, rangeMax: number) {
  return num >= rangeMin && num <= rangeMax;
}


function parseLine(line: string): ICoords {
  return line.split(',').map(el => parseInt(el)) as ICoords;
}

function getNeighbours(coords: ICoords) {
  const [x, y , z] = coords;

  return [
    [x + 1, y, z],
    [x - 1, y, z],
    [x, y + 1, z],
    [x, y - 1, z],
    [x, y, z + 1],
    [x, y, z - 1],
  ].map(el => el.join(','));
}

