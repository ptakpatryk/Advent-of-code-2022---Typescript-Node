"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.partTwo = exports.partOne = void 0;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const FILE_PATH = 'public/day_3_input.txt';
const alphabet_lowercase = [...'abcdefghijklmnopqrstuvwxyz'];
const alphabet_uppercase = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const scoreSet = {};
alphabet_lowercase.forEach((letter, index) => scoreSet[letter] = index + 1);
alphabet_uppercase.forEach((letter, index) => scoreSet[letter] = index + 27);
const partOne = () => {
    const fileInterace = getFileInterface();
    return new Promise((resolve) => {
        let score = 0;
        fileInterace.on('line', (line) => {
            const itemsArr = line.split('');
            const firstHalf = itemsArr.slice(0, itemsArr.length / 2);
            const secondHalf = itemsArr.slice(itemsArr.length / 2);
            const commonItem = getCommonItem(firstHalf, secondHalf);
            score += getScore(commonItem);
        });
        // resolve score
        fileInterace.on('close', () => resolve(score));
    });
};
exports.partOne = partOne;
const partTwo = () => {
    const fileInterace = getFileInterface();
    return new Promise((resolve) => {
        let score = 0;
        let lines = [];
        fileInterace.on('line', (line) => {
            lines.push(line.split(''));
            if (lines.length === 3) {
                const groupBadge = getGroupBadge(lines);
                score += getScore(groupBadge);
                lines = [];
            }
        });
        fileInterace.on('close', () => resolve(score));
    });
};
exports.partTwo = partTwo;
function getFileInterface() {
    return readline_1.default.createInterface({
        input: fs_1.default.createReadStream(FILE_PATH),
    });
}
function getGroupBadge(group) {
    return group[0].find(item => group[1].includes(item) && group[2].includes(item));
}
function getScore(item) {
    if (item && scoreSet[item]) {
        return scoreSet[item];
    }
    else {
        return 0;
    }
}
function getCommonItem(firstHalf, secondHalf) {
    return firstHalf.find(item => secondHalf.includes(item));
}
