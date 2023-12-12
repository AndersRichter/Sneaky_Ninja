const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInputPartOne = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const simpleAnswerPartOne = 142;

// --- Part One ---
const decodeCalibrationValues = input => input
    .split("\n")
    .map(string => string.replace(/[a-z,A-Z]+/g, ""))
    .map(string => `${string[0]}${string[string.length - 1]}`)
    .map(string => +string)
    .reduce((sum, value) => sum + value, 0)
;

console.log("Part One - simple test: ", decodeCalibrationValues(simpleInputPartOne) === simpleAnswerPartOne);
console.log("Part One - real test: ", decodeCalibrationValues(input) === answerPartOne);

const simpleInputPartTwo = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const simpleAnswerPartTwo = 281;

const numbersList = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };

// we use groups here to search with overlapping, example:
// "eightwothree".matchAll(/one|two.../g) => eight, three
// "eightwothree".matchAll((?=(/one|two...))/g) => eight, two, three
const numbersRegex = /(?=(one|two|three|four|five|six|seven|eight|nine|[1-9]))/g;

// --- Part Two ---
const decodeCalibrationValuesWithDigits = input => input
    .split("\n")
    .map(string => {
        const numbersFromStringMatch = [...string.matchAll(numbersRegex)]; // format: [ [ '', 'five', index: 3, input: 'some_string', groups: undefined ] ]

        const firstNumberFromString = numbersFromStringMatch[0][1];
        const lastNumberFromString = numbersFromStringMatch[numbersFromStringMatch.length - 1][1];

        const firstNumber = isNaN(firstNumberFromString) ? numbersList[firstNumberFromString] : +firstNumberFromString;
        const lastNumber = isNaN(lastNumberFromString) ? numbersList[lastNumberFromString] : +lastNumberFromString;

        return +`${firstNumber}${lastNumber}`;
    })
    .reduce((sum, value) => sum + value, 0);

console.log("Part Two - simple test: ", decodeCalibrationValuesWithDigits(simpleInputPartTwo) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", decodeCalibrationValuesWithDigits(input) === answerPartTwo);
