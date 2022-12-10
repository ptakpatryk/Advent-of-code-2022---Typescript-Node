import { getFileInterface } from '../../utils';
import { cloneDeep } from 'lodash';

const FILE_PATH = 'public/day_10_input.txt';

type IState = {
  register: number,
  registerPerCycle: number[]
}

type IProgram = 'noop' | 'addx';


export const partOne = async () => {
  const state = await runProgram();

  const cyclesNeeded = [20, 60, 100, 140, 180, 220];
  const signalStrengths = cyclesNeeded.map(cycle => {
    return state.registerPerCycle[cycle - 1] * cycle;
  })

  const result = signalStrengths.reduce((acc, curr) => acc + curr, 0);
  return result;

};

export const partTwo = async () => {
  const state = await runProgram();

  const screenRows = state.registerPerCycle.length / 40;
  const screenRowsDrawed = [];

  for (let i = 0; i < screenRows; i++) {
    const drawLine = state.registerPerCycle.slice(40 * i, 40 * (i +1)).map((cycle, index) => {
      return isDrawingOnSpirit(index, cycle) ? '#' : '.';
    })
    screenRowsDrawed.push(drawLine)
  }

  const result = screenRowsDrawed.map(line => line.join('')).join('\n')
  return result;
};

function isDrawingOnSpirit(drawingPoint:number, spiritMid: number) {
  return [spiritMid - 1, spiritMid, spiritMid +1].includes(drawingPoint);
}

function runProgram() {
  const file = getFileInterface(FILE_PATH);

  let state: IState = {
    register: 1,
    registerPerCycle: [],
  };

  return new Promise<IState>((resolve) => {

    file.on('line', line => {
      let [program, input] = parseLine(line);

      if (program === 'noop') {
        state = noop(state);
      } else if (program === 'addx' && input) {
        state = addx(input, state);
      }
    });

    file.on('close', () => {
      resolve(state)
    });
  })
}

function parseLine(line: string) {
  const lineParsed = line.split(' ') as [IProgram, any];

  if (lineParsed[1]) {
    lineParsed[1] = parseInt(lineParsed[1])
  };

  return lineParsed as [IProgram, number | undefined]
}

function noop(state: IState) {
  const stateCopy = cloneDeep(state);

  stateCopy.registerPerCycle.push(stateCopy.register);
  return stateCopy;
}

function addx(input: number, state: IState) {
  const stateCopy = cloneDeep(state);

  stateCopy.registerPerCycle.push(stateCopy.register, stateCopy.register);
  stateCopy.register = stateCopy.register + input;

  return stateCopy;
}
