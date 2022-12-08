import * as dayOne from './days_code/1';
import * as dayTwo from './days_code/2';
import * as dayThree from './days_code/3';
import * as dayFour from './days_code/4';
import * as dayFive from './days_code/5';
import * as daySix from './days_code/6';
import * as daySeven from './days_code/7';




(async function() {
  // ***** DAY 1
  // * PART 1
  const dayOnePartOneSolution = dayOne.partOne();
  console.log(`Day 1 (part I) - Elf carrying the most calories is carrying ${dayOnePartOneSolution} calories.`);
  // * PART 2
  const dayOnePartTwoSolution = dayOne.partTwo();
  console.log(`Day 1 (part II) - Three elves carrying the most calories are carrying ${dayOnePartTwoSolution} calories.`);

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

  // ***** DAY 4
  // * PART 1
  const dayFourPartOneSolution = await dayFour.partOne();
  console.log(`Day 4 (part I) - In how many assignment pairs does one range fully contain the other? - ${dayFourPartOneSolution}.`);
  // * PART 2
  const dayFourPartTwoSolution = await dayFour.partTwo();
  console.log(`Day 4 (part II) - In how many assignment pairs do the ranges overlap? ${dayFourPartTwoSolution}.`);
  
  // ***** DAY 5
  // * PART 1
  const dayFivePartOneSolution = await dayFive.partOne();
  console.log(`Day 5 (part I) - After the rearrangement procedure completes, what crate ends up on top of each stack? - ${dayFivePartOneSolution}.`);
  // * PART 2
  const dayFivePartTwoSolution = await dayFive.partTwo();
  console.log(`Day 5 (part II) - After the rearrangement procedure with new crane completes, what crate ends up on top of each stack? - ${dayFivePartTwoSolution}.`);

  // ***** DAY 6
  // * PART 1
  const daySixPartOneSolution = daySix.partOne();
  console.log(`Day 6 (part I) - How many characters need to be processed before the first start-of-packet marker is detected? ${daySixPartOneSolution}.`);
  // * PART 2
  const daySixPartTwoSolution = daySix.partTwo();
  console.log(`Day 6 (part II) - How many characters need to be processed before the first start-of-message marker is detected? ${daySixPartTwoSolution}.`);

  // ***** DAY 7
  // * PART 1
  const daySevenPartOneSolution = await daySeven.partOne();
  console.log(`Day 6 (part I) - What is the sum of the total sizes of those directories? ${daySevenPartOneSolution}.`);
  // * PART 2
  const daySevenPartTwoSolution = await daySeven.partTwo();
  console.log(`Day 6 (part II) - What is the total size of that directory? ${daySevenPartTwoSolution}.`);
})();



