const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `Time:      7  15   30
Distance:  9  40  200`;

const simpleAnswerPartOne = 288;
const simpleAnswerPartTwo = 71503;

// --- Part One ---
const countWiningWays = input => {
    const formattedInput = input
        .split("\n")
        .map(line => line
            .replace(/ +/g, "-")
            .split("-")
            .slice(1)
            .map(number => +number)
        );

    let winingWays = 1;

    formattedInput[0].forEach((time, i) => {
        const distance = formattedInput[1][i];

        for (let j = 1; j < time; j++) {
            const currentDistance = (time - j) * j;
            if (currentDistance > distance) {
                winingWays *= (time + 1) - j * 2;
                break;
            }
        }
    })


    return winingWays;
}

console.log("Part One - simple test: ", countWiningWays(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", countWiningWays(input) === answerPartOne);

// --- Part Two ---
const countWiningWaysForOneHugeRace = input => {
    const formattedInput = input
        .split("\n")
        .map(line => line
            .replace(/ +/g, "")
            .split(":")
            .slice(1)
            .map(number => +number)
        )
        .flat(1);

    let winingWays = 1;
    const time = formattedInput[0];
    const distance = formattedInput[1];

    for (let j = 1; j < time; j++) {
        const currentDistance = (time - j) * j;
        if (currentDistance > distance) {
            winingWays *= (time + 1) - j * 2;
            break;
        }
    }


    return winingWays;
}

console.log("Part Two - simple test: ", countWiningWaysForOneHugeRace(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", countWiningWaysForOneHugeRace(input) === answerPartTwo);
