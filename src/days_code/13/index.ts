import fs from 'fs';

const FILE_PATH = 'public/day_13_input.txt';

type IPacketValue = number | IPacket;
type IPacket = IPacketValue[];
type IPair = [IPacket, IPacket];

export const partOne = () => {
  const signals = getSignals();

  const result = signals.map(signal => {
    return comparePacketPair(signal[0], signal[1])
  }).map((el, i) => {
    if (el) {
      return i + 1;
    }
  }).filter(Boolean) as number[]

  return result.reduce((acc, curr) => acc + curr, 0);
}

export const partTwo = () => {
  const signals = getSignals();

  const decoderKeys: IPacket[] = [[[6]], [[2]]];

  const sorted = [...decoderKeys, ...signals.flat()].sort((signalA, signalB) => comparePacketPair(signalA, signalB) ? -1 : 1);
  const indexes = sorted.map((el, i) => decoderKeys.includes(el) ? i + 1 : false)
    .filter(Boolean) as number[];
  const result = indexes.reduce((acc, curr) => acc * curr, 1);

  return result;
}

function convertToPacket(value: IPacketValue) {
  return typeof value === 'number' ? [value] : value;
}

function comparePacketPair(left: IPacket, right: IPacket): boolean | null {
  for (const [index, leftValue] of left.entries()) {
    // Get right value with the same index
    const rightValue = right[index];

    // Right side ran out of items, so inputs are not in the right order
    if (rightValue === undefined) return false;

    if (areNumbers(leftValue, rightValue)) {
      if (leftValue === rightValue) continue;

      return leftValue < rightValue;
    }

    const comparisonResult = comparePacketPair(convertToPacket(leftValue), convertToPacket(rightValue))

    if (comparisonResult !== null) return comparisonResult;
  }

  // Left packet ran out of values - true, if each one is the same - null
  return left.length < right.length ? true : null
}

function areNumbers<T>(...variables: T[]): boolean {
  return variables.every(variable => typeof variable === 'number');
}

export function getSignals() {
  const file = fs.readFileSync(FILE_PATH, 'utf8');

  return file
    .split('\n\n')
    .map(pair => {
      return (pair.split('\n') as [string, string])
        .filter(Boolean)
        .map(line => {
          return JSON.parse(line)
        })
    }) as IPair[]
}
