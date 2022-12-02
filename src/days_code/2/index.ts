import fs from 'fs';
import readline from 'readline';

type OpponentMove = 'A' | 'B' | 'C';
type SecretCode = 'X' | 'Y' | 'Z';
type GameMoves = 'R' | 'P' | 'S'; // R - rock, P - paper, S - scissors
type ResultStatus = 'lose' | 'draw' | 'win'; // R - rock, P - paper, S - scissors

export const partOne = () => {
  const file = getFileInterface();

  return new Promise((resolve) => {
    let score = 0;

    file.on('line', line => {
      const moves = line.split(' ').map(move => translateMove(move as SecretCode | OpponentMove));
      const [opponentMove, myMove] = moves;

      score += getMoveScore(myMove);
      score += getMatchScore(myMove, opponentMove);
    });

    file.on('close', () => {
      resolve(score);
    });

  });
};

export const partTwo = () => {
  const file = getFileInterface();

  return new Promise((resolve) => {
    let score = 0;

    file.on('line', line => {
      const moves = line.split(' ');
      const [opponentMoveCode, expectedResultCode] = moves as [OpponentMove, SecretCode];

      const [opponentGameMove, expectedResultStatus] = [translateMove(opponentMoveCode), translateResultCode(expectedResultCode)];
      const myMove = getExpectedMove(opponentGameMove, expectedResultStatus);

      score += getMoveScore(myMove);
      score += getMatchScore(myMove, opponentGameMove);
    });

    file.on('close', () => {
      resolve(score);
    });

  });
};


function getFileInterface() {
  return readline.createInterface({
    input: fs.createReadStream('public/day_2_input.txt')
  });
}

function getMoveScore(move: GameMoves) {
  switch (move) {
  case 'R':
    return 1;
  case 'P':
    return 2;
  case 'S':
    return 3;
  default:
    const _exhaustiveCheck: never = move;
    return _exhaustiveCheck;
  }
}

function getMatchScore(me: GameMoves, oppo: GameMoves) {

  if (me === oppo) {
    return 3;
  }

  if (
    me === 'R' && oppo === 'S' ||
    me === 'P' && oppo === 'R' ||
    me === 'S' && oppo === 'P'
  ) {
    return 6;
  }

  return 0;
}

function translateMove(move: SecretCode | OpponentMove): GameMoves {
  switch (move) {
  case 'A':
  case 'X':
    return 'R';
  case 'B':
  case 'Y':
    return 'P';
  case 'C':
  case 'Z':
    return 'S';
  default:
    const _exhaustiveCheck: never = move;
    return _exhaustiveCheck;
  }
}

function translateResultCode(resultCode: SecretCode): ResultStatus {
  switch (resultCode) {
  case 'X':
    return 'lose';
  case 'Y':
    return 'draw';
  case 'Z':
    return 'win';
  default:
    const _exhaustiveCheck: never = resultCode;
    return _exhaustiveCheck;
  }
}

function getExpectedMove(opponentMove: GameMoves, expectedStatus: ResultStatus): GameMoves {
  switch (expectedStatus) {
  case 'win':
    return matchWinner(opponentMove);
  case 'lose':
    return matchLoser(opponentMove);
  case 'draw':
    return opponentMove;
  default:
    const _exhaustiveCheck: never = expectedStatus;
    return _exhaustiveCheck;
  }
}

function matchWinner(move: GameMoves) {
  switch (move) {
  case 'R':
    return 'P';
  case 'P':
    return 'S';
  case 'S':
    return 'R';
  default:
    const _exhaustiveCheck: never = move;
    return _exhaustiveCheck;
  }
}

function matchLoser(move: GameMoves) {
  switch (move) {
  case 'R':
    return 'S';
  case 'P':
    return 'R';
  case 'S':
    return 'P';
  default:
    const _exhaustiveCheck: never = move;
    return _exhaustiveCheck;
  }
}
