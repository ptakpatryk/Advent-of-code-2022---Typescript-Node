import * as dayOne from './days_code/1';
import * as dayTwo from './days_code/2';
import * as dayThree from './days_code/3';

// ***** DAY 1
// * PART 1
const dayOnePartOneSolution = dayOne.partOne();
console.log(`Day 1 (part I) - Elf carrying the most calories is carrying ${dayOnePartOneSolution} calories.`);

// * PART 2
const dayOnePartTwoSolution = dayOne.partTwo();
console.log(`Day 1 (part II) - Three elves carrying the most calories are carrying ${dayOnePartTwoSolution} calories.`);

(async function() {
  // ***** DAY 2
  // * PART 1
  const dayTwoPartOneSolution = await dayTwo.partOne();
  console.log(`Day 2 (part I) - according to strategy my total score would be ${dayTwoPartOneSolution} points.`);
  // * PART 2
  const dayTwoPartTwoSolution = await dayTwo.partTwo();
  console.log(`Day 2 (part I) - according to another strategy my total score would be ${dayTwoPartTwoSolution} points.`);

  // ***** DAY 3
  // * PART 1
  const dayThreePartOneSolution = await dayThree.partOne();
  console.log(`Day 3 (part I) - Sum of the priorities of item types is equal ${dayThreePartOneSolution}.`);

  // * PART 2
  const dayThreePartTwoSolution = await dayThree.partTwo();
  console.log(`Day 3 (part II) - Sum of the priorities of badge item types is equal ${dayThreePartTwoSolution}.`);
})();

