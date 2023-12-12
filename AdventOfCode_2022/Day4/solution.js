const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const simpleAnswerPartOne = 2;
const simpleAnswerPartTwo = 4;

const hasIntervalsFullOverlapping = (first, second) =>
    first[0] <= second[0] && first[1] >= second[1] || second[0] <= first[0] && second[1] >= first[1];

// --- Part One ---
const findIntervalFullOverlappingPairs = input => input
    .split("\n")
    .reduce((sum, pairString) => {
        const first = pairString.split(",")[0].split("-").map(value => +value);
        const second = pairString.split(",")[1].split("-").map(value => +value);

        return sum + (hasIntervalsFullOverlapping(first, second) ? 1 : 0);
    }, 0);

console.log("Part One - simple test: ", findIntervalFullOverlappingPairs(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", findIntervalFullOverlappingPairs(input) === answerPartOne);

// --- Part Two ---
const findIntervalOverlappingPairs = input => input
    .split("\n")
    .reduce((sum, pairString) => {
        const first = pairString.split(",")[0].split("-").map(value => +value);
        const second = pairString.split(",")[1].split("-").map(value => +value);

        return sum + (
            first[0] >= second[0] && first[0] <= second[1] ||
            first[1] >= second[0] && first[1] <= second[1] ||
            hasIntervalsFullOverlapping(first, second) ? 1 : 0
        );
    }, 0);

console.log("Part Two - simple test: ", findIntervalOverlappingPairs(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", findIntervalOverlappingPairs(input) === answerPartTwo);
