"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.partTwo = exports.partOne = void 0;
const fs_1 = __importDefault(require("fs"));
const partOne = () => {
    const caloriesList = caloriesSumList();
    return Math.max(...caloriesList);
};
exports.partOne = partOne;
const partTwo = () => {
    const caloriesList = caloriesSumList();
    // Sort descending
    caloriesList.sort((a, b) => b - a);
    const topThree = caloriesList.slice(0, 3);
    return topThree.reduce((acc, curr) => acc += curr, 0);
};
exports.partTwo = partTwo;
function caloriesSumList() {
    const list = fs_1.default.readFileSync('./public/day_1_input.txt', 'utf8');
    const calories = list.split('\n\n');
    const elvesCalories = calories.map(elfFood => elfFood.split('\n'));
    // PARSE ARRAY TO NUMBERS AND CLEAN NULLS
    const elvesCaloriesNums = elvesCalories.map(elfList => elfList.map(el => parseInt(el)).filter(Boolean));
    // Sum per elf
    return elvesCaloriesNums.map(elfList => elfList.reduce((caloriesSum, curr) => caloriesSum += curr, 0));
}
