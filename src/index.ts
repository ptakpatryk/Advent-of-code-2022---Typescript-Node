/* import * as dayOne from './days_code/1'; */
import * as dayTwo from './days_code/2';

/* // ***** DAY 1 */
/* // * PART 1 */
/* const dayOnePartOneSolution = dayOne.partOne(); */
/* console.log(`Day 1 (part I) - Elf carrying the most calories is carrying ${dayOnePartOneSolution} calories.`); */
/**/
/* // * PART 2 */
/* const dayOnePartTwoSolution = dayOne.partTwo(); */
/* console.log(`Day 1 (part II) - Three elves carrying the most calories are carrying ${dayOnePartTwoSolution} calories.`); */

// ***** DAY 2
(async function() {
  // * PART 1
  const dayTwoPartOneSolution = await dayTwo.partOne();
  console.log(`Day 2 (part I) - according to strategy my total score would be ${dayTwoPartOneSolution} points.`);
  // * PART 2
  const dayTwoPartTwoSolution = await dayTwo.partTwo();
  console.log(`Day 2 (part I) - according to another strategy my total score would be ${dayTwoPartTwoSolution} points.`);
})();
