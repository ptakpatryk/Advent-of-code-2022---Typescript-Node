import { getFileInterface } from '../../utils';

const FILE_PATH = 'public/day_5_input.txt';

type Instruction = { quantity: number; fromIndex: number; toIndex: number };

export const partOne = () => getResult('1');
export const partTwo = () => getResult('2');

function getResult(part: '1' | '2') {
  const file = getFileInterface(FILE_PATH);

  return new Promise((resolve) => {
    let stacks: string[][] = [];

    file.on('line', (line) => {
      const lineType = getLineType(line);

      if (lineType === 'crates') {
        const row = parseStacks(line);
        row.forEach((el, i) => {
          if (!stacks?.[i]?.length) {
            stacks[i] = [];
          }
          if (el) {
            stacks[i].unshift(el);
          }
        });
      }

      if (lineType === 'instruction') {
        const instruction = parseInstruction(line);
        if (part === '1') {
          stacks = performInstructionOldCrane(stacks, instruction);
        } else {
          stacks = performInstructionNewCrane(stacks, instruction);
        }
      }
    });

    file.on('close', () => {
      const response = stacks.map(stack => stack.at(-1)).join('');
      resolve(response);
    });
  });
}


function getLineType(line: string) {
  if (line.includes('[')) {
    return 'crates';
  } else if (line.includes('move')) {
    return 'instruction';
  }

  return null;
}

function parseStacks(line: string) {
  const numberOfStacks = (line.length + 1) / 4;
  return Array.from({ length: numberOfStacks }, (_el, index) => {
    return line
      .slice(index * 4, index * 4 + 4)
      .trim()
      // Removes special chars (optional)
      .replace('[', '')
      .replace(']', '');
  });
}

function parseInstruction(line: string): Instruction {
  const lineArr = line.split(' ');
  const quantity = parseInt(lineArr[1]);
  const fromIndex = parseInt(lineArr[3]) - 1;
  const toIndex = parseInt(lineArr[5]) - 1;

  return { quantity, fromIndex, toIndex };
}

function performInstructionOldCrane(stack: string[][], instruction: Instruction) {
  const stackCopy = [...stack];

  for (let i = 0; i < instruction.quantity; i++) {
    const moved = stackCopy[instruction.fromIndex].pop();
    if (moved) {
      stackCopy[instruction.toIndex].push(moved);
    }
  }

  return stackCopy;
}

function performInstructionNewCrane(stack: string[][], instruction: Instruction) {
  const stackCopy = [...stack];
  const startIndex = stackCopy[instruction.fromIndex].length - instruction.quantity;
  const moved = stackCopy[instruction.fromIndex].splice(startIndex);
  stackCopy[instruction.toIndex] = [...stackCopy[instruction.toIndex], ...moved];

  return stackCopy;
}


/* [N]     [Q]         [N]             */
/* [R]     [F] [Q]     [G] [M]         */
/* [J]     [Z] [T]     [R] [H] [J]     */
/* [T] [H] [G] [R]     [B] [N] [T]     */
/* [Z] [J] [J] [G] [F] [Z] [S] [M]     */
/* [B] [N] [N] [N] [Q] [W] [L] [Q] [S] */
/* [D] [S] [R] [V] [T] [C] [C] [N] [G] */
/* [F] [R] [C] [F] [L] [Q] [F] [D] [P] */
/*  1   2   3   4   5   6   7   8   9 */
