"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.partTwo = exports.partOne = void 0;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const partOne = () => {
    const file = getFileInterface();
    return new Promise((resolve) => {
        let score = 0;
        file.on('line', line => {
            const moves = line.split(' ').map(move => translateMove(move));
            const [opponentMove, myMove] = moves;
            score += getMoveScore(myMove);
            score += getMatchScore(myMove, opponentMove);
        });
        file.on('close', () => {
            resolve(score);
        });
    });
};
exports.partOne = partOne;
const partTwo = () => {
    const file = getFileInterface();
    return new Promise((resolve) => {
        let score = 0;
        file.on('line', line => {
            const moves = line.split(' ');
            const [opponentMoveCode, expectedResultCode] = moves;
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
exports.partTwo = partTwo;
function getFileInterface() {
    return readline_1.default.createInterface({
        input: fs_1.default.createReadStream('public/day_2_input.txt')
    });
}
function getMoveScore(move) {
    switch (move) {
        case 'R':
            return 1;
        case 'P':
            return 2;
        case 'S':
            return 3;
        default:
            const _exhaustiveCheck = move;
            return _exhaustiveCheck;
    }
}
function getMatchScore(me, oppo) {
    if (me === oppo) {
        return 3;
    }
    if (me === 'R' && oppo === 'S' ||
        me === 'P' && oppo === 'R' ||
        me === 'S' && oppo === 'P') {
        return 6;
    }
    return 0;
}
function translateMove(move) {
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
            const _exhaustiveCheck = move;
            return _exhaustiveCheck;
    }
}
function translateResultCode(resultCode) {
    switch (resultCode) {
        case 'X':
            return 'lose';
        case 'Y':
            return 'draw';
        case 'Z':
            return 'win';
        default:
            const _exhaustiveCheck = resultCode;
            return _exhaustiveCheck;
    }
}
function getExpectedMove(opponentMove, expectedStatus) {
    switch (expectedStatus) {
        case 'win':
            return matchWinner(opponentMove);
        case 'lose':
            return matchLoser(opponentMove);
        case 'draw':
            return opponentMove;
        default:
            const _exhaustiveCheck = expectedStatus;
            return _exhaustiveCheck;
    }
}
function matchWinner(move) {
    switch (move) {
        case 'R':
            return 'P';
        case 'P':
            return 'S';
        case 'S':
            return 'R';
        default:
            const _exhaustiveCheck = move;
            return _exhaustiveCheck;
    }
}
function matchLoser(move) {
    switch (move) {
        case 'R':
            return 'S';
        case 'P':
            return 'R';
        case 'S':
            return 'P';
        default:
            const _exhaustiveCheck = move;
            return _exhaustiveCheck;
    }
}
