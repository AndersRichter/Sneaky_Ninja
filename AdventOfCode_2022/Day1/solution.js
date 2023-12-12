const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

const simpleAnswerPartOne = 24000;
const simpleAnswerPartTwo = 45000;

// --- Part One ---
const findElfCarryingMostCalories = input => Math.max(...input
    .split("\n\n")
    .map(caloriesString => caloriesString.split("\n"))
    .map(caloriesArray => caloriesArray.reduce((sum, value) => sum + +value, 0))
);

console.log("Part One - simple test: ", findElfCarryingMostCalories(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", findElfCarryingMostCalories(input) === answerPartOne);

// --- Part Two ---
const findTopThreeElvesCarryingMostCalories = input => input
    .split("\n\n")
    .map(caloriesString => caloriesString.split("\n"))
    .map(caloriesArray => caloriesArray.reduce((sum, value) => sum + +value, 0))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, value) => sum + value)
;

console.log("Part Two - simple test: ", findTopThreeElvesCarryingMostCalories(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", findTopThreeElvesCarryingMostCalories(input) === answerPartTwo);