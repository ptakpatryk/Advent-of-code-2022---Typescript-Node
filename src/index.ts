import * as dayOne from './days_code/1';
import * as dayTwo from './days_code/2';
import * as dayThree from './days_code/3';
import * as dayFour from './days_code/4';
import * as dayFive from './days_code/5';
import * as daySix from './days_code/6';
import * as daySeven from './days_code/7';
import * as dayEight from './days_code/8';
import * as dayNine from './days_code/9';
import * as dayTen from './days_code/10';
import * as dayEleven from './days_code/11';
import * as dayTwelve from './days_code/12';
import * as dayThirteen from './days_code/13';
import * as dayFourteen from './days_code/14';



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
  console.log(`Day 7 (part I) - What is the sum of the total sizes of those directories? ${daySevenPartOneSolution}.`);
  // * PART 2
  const daySevenPartTwoSolution = await daySeven.partTwo();
  console.log(`Day 7 (part II) - What is the total size of that directory? ${daySevenPartTwoSolution}.`);

  // ***** DAY 8
  // * PART 1
  const dayEightPartOneSolution = dayEight.partOne();
  console.log(`Day 8 (part I) - How many trees are visible from outside the grid? - ${dayEightPartOneSolution}.`);
  // * PART 2
  const dayEightPartTwoSolution = dayEight.partTwo();
  console.log(`Day 8 (part II) - What is the highest scenic score possible for any tree? - ${dayEightPartTwoSolution}.`);

  // ***** DAY 9
  // * PART 1
  const dayNinePartOneSolution = await dayNine.partOne();
  console.log(`Day 9 (part I) - How many positions does the tail of the rope visit at least once? - ${dayNinePartOneSolution}.`);
  // * PART 2
  const dayNinePartTwoSolution = await dayNine.partTwo();
  console.log(`Day 9 (part II) - How many positions does the last part of the tail of the rope visit at least once? - ${dayNinePartTwoSolution}.`);

  // ***** DAY 10
  // * PART 1
  const dayTenPartOneSolution = await dayTen.partOne();
  console.log(`Day 10 (part I) - What is the sum of these six signal strengths? - ${dayTenPartOneSolution}.`);
  // * PART 2
  const dayTenPartTwoSolution = await dayTen.partTwo();
  console.log('Day 10 (part II) - What eight capital letters appear on your CRT?');
  console.log(dayTenPartTwoSolution)

  // ***** DAY 11
  // * PART 1
  const dayElevenPartOneSolution = dayEleven.partOne();
  console.log(`Day 11 (part I) - What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans? - ${dayElevenPartOneSolution}.`);

  // ***** DAY 12
  // * PART 1
  const dayTwelvePartOneSolution = dayTwelve.partOne();
  console.log(`Day 12 (part I) - What is the fewest steps required to move from your current position to the location that should get the best signal? - ${dayTwelvePartOneSolution}.`);
  // * PART 2
  const dayTwelvePartTwoSolution = dayTwelve.partTwo();
  console.log(`Day 12 (part II) - What is the fewest steps required to move starting from any square with elevation a to the location that should get the best signal? ${dayTwelvePartTwoSolution}`);

  // ***** DAY 13
  // * PART 1
  const dayThirteenPartOneSolution = dayThirteen.partOne();
  console.log(`Day 13 (part I) - What is the sum of the indices of those pairs?? - ${dayThirteenPartOneSolution}.`);
  // * PART 2
  const dayThirteenPartTwoSolution = dayThirteen.partTwo();
  console.log(`Day 13 (part II) - What is the decoder key for the distress signal? ${dayThirteenPartTwoSolution}`);
  
  // ***** DAY 14
  // * PART 1
  const dayFourteenPartOneSolution = dayFourteen.partOne();
  console.log(`Day 14 (part I) - What is the sum of the indices of those pairs?? - ${dayFourteenPartOneSolution}.`);
  // * PART 2
  const dayFourteenPartTwoSolution = dayFourteen.partTwo();
  console.log(`Day 14 (part II) - What is the decoder key for the distress signal? ${dayFourteenPartTwoSolution}`);
})();
