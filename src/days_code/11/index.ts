import fs from 'fs';

const FILE_PATH = 'public/day_11_input.txt';
const ROUNDS_TO_PLAY_ONE = 20;
const ROUNDS_TO_PLAY_TWO = 10000;

type IMonkey = {
  id: number;
  items: number[];
  operation: IOperation;
  testDivider: number;
  passesTo: [number, number] // 0 - if test true, 1 - if test false
  inspectsCount: number;
}
type IOperation = [IOperationMethod, number | 'old']

type IOperationMethod = '*' | '+';

export const partOne = () => {
  let monkeys = getMonkeys();

  for (let round = 1; round <= ROUNDS_TO_PLAY_ONE; round++) {
    monkeys.forEach((monkey) => {
      // MONKEY TURN
      monkey.items.map(item => {
        // record inspection
        monkey.inspectsCount++;
        // inspect + get bored with item
        const inspectedItem = divisionBored(inspectItem(item, monkey.operation));
        const passesTo = getRecievingMonkeyIndex(inspectedItem, monkey);
        monkeys[passesTo].items.push(inspectedItem);
      })
      // pass item
      monkey.items = [];

      return monkey;
    })
  }

  monkeys.sort((a, b) => b.inspectsCount - a.inspectsCount);
  const result = monkeys[0].inspectsCount * monkeys[1].inspectsCount;

  return result;
}

export const partTwo = () => {
  let monkeys = getMonkeys();
  const modulus = monkeys.reduce((acc, curr) => curr.testDivider * acc, 1)

  for (let round = 1; round <= ROUNDS_TO_PLAY_TWO; round++) {
    monkeys.forEach((monkey) => {
      // MONKEY TURN
      monkey.items.map(item => {
        // record inspection
        monkey.inspectsCount++;
        // inspect + get bored with item
        // replaces with congruent numbers 
        const operation = [monkey.operation[0], monkey.operation[1] === 'old' ? monkey.operation[1] : monkey.operation[1] % modulus ] as IOperation;
        const inspectedItem = inspectItem(
          item % modulus,
          operation
        );
        const passesTo = getRecievingMonkeyIndex(inspectedItem, monkey, monkey.testDivider % modulus);
        monkeys[passesTo].items.push(inspectedItem);
      })
      // pass item
      monkey.items = [];

      return monkey;
    })
  }


  monkeys.sort((a, b) => b.inspectsCount - a.inspectsCount);
  return monkeys[0].inspectsCount * monkeys[1].inspectsCount;
}

function getMonkeys() {
  const file = fs.readFileSync(FILE_PATH, 'utf8');

  const monkeys = file.split('\n\n');
  return monkeys
    .map((monkey) => {
      const monkeyLines = monkey.split('\n');
      return {
        id: getId(monkeyLines[0]),
        items: getItems(monkeyLines[1]),
        operation: getOperation(monkeyLines[2]),
        testDivider: getTestDivider(monkeyLines[3]),
        passesTo: getMonkeyThrows(monkeyLines[4], monkeyLines[5]),
        inspectsCount: 0,
      } as IMonkey
    })
};

function isInt(n: number) {
  return n % 1 === 0;
};

function inspectItem(n: number, operation: IOperation) {
  const operationNumber = operation[1] === 'old' ? n : operation[1];
  const method = operation[0];

  if (method === '*') {
    return n * operationNumber;
  }
  return n + operationNumber;
}

function divisionBored(n: number) {
  return Math.floor(n / 3);
}

function testNumber(n: number, divBy: number) {
  const test = n / divBy;
  return isInt(test);
}

// returns monkey index
function getRecievingMonkeyIndex(item: number, monkey: IMonkey, congruentTestDivider?: number) {
  const testResult = testNumber(item, congruentTestDivider ? congruentTestDivider : monkey.testDivider);
  return testResult ? monkey.passesTo[0] : monkey.passesTo[1];
}

// PARSING FUNCITONS
function getId(line: string) {
  return parseInt(line.split(' ')[1].slice(0, -1));
}

function getItems(line: string) {
  return line.split(' ').slice(4).map(el => parseInt(el));
}

function getOperation(line: string): IOperation {
  const method = line.split(' ').at(-2) as IOperationMethod;
  const multiplier = line.split(' ').at(-1) as string;
  if (isNaN(parseInt(multiplier))) {
    return [method, 'old']
  } else {
    return [method, parseInt(multiplier)]
  }
}

function getTestDivider(line: string) {
  return parseInt(line.split(' ').at(-1) as string);
}

function getMonkeyThrows(lineOne: string, lineTwo: string) {
  const ifTrue = parseInt(lineOne.split(' ').at(-1) as string);
  const ifFalse = parseInt(lineTwo.split(' ').at(-1) as string);

  return [ifTrue, ifFalse];
}
