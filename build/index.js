"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayOne = __importStar(require("./days_code/1"));
const dayTwo = __importStar(require("./days_code/2"));
const dayThree = __importStar(require("./days_code/3"));
// ***** DAY 1
// * PART 1
const dayOnePartOneSolution = dayOne.partOne();
console.log(`Day 1 (part I) - Elf carrying the most calories is carrying ${dayOnePartOneSolution} calories.`);
// * PART 2
const dayOnePartTwoSolution = dayOne.partTwo();
console.log(`Day 1 (part II) - Three elves carrying the most calories are carrying ${dayOnePartTwoSolution} calories.`);
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        // ***** DAY 2
        // * PART 1
        const dayTwoPartOneSolution = yield dayTwo.partOne();
        console.log(`Day 2 (part I) - according to strategy my total score would be ${dayTwoPartOneSolution} points.`);
        // * PART 2
        const dayTwoPartTwoSolution = yield dayTwo.partTwo();
        console.log(`Day 2 (part I) - according to another strategy my total score would be ${dayTwoPartTwoSolution} points.`);
        // ***** DAY 3
        // * PART 1
        const dayThreePartOneSolution = yield dayThree.partOne();
        console.log(`Day 3 (part I) - Sum of the priorities of item types is equal ${dayThreePartOneSolution}.`);
        // * PART 2
        const dayThreePartTwoSolution = yield dayThree.partTwo();
        console.log(`Day 3 (part II) - Sum of the priorities of badge item types is equal ${dayThreePartTwoSolution}.`);
    });
})();
