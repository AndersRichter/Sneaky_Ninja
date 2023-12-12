const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const simpleInput2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const simpleInput3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const simpleAnswerPartOne1 = 2;
const simpleAnswerPartOne2 = 6;
const simpleAnswerPartTwo = 6;

// --- Part One ---
const findPathFromAAAToZZZ = input => {
    const formattedInput = input.split("\n");
    const commands = formattedInput[0].split("");
    const map = formattedInput
        .slice(2)
        .map(line => line.split(" = "))
        .reduce((result, [key, pair]) => {
            const leftRightPair = pair.substring(1, pair.length - 1).split(", ");
            result[key] = { L: leftRightPair[0], R: leftRightPair[1] };
            return result;
        }, {});

    let currentKey = "AAA";
    let steps = 0;
    let currentCommandIndex = 0;

    while (currentKey !== "ZZZ") {
        currentKey = map[currentKey][commands[currentCommandIndex]];

        steps++;
        currentCommandIndex++;

        if (currentCommandIndex === commands.length) {
            currentCommandIndex = 0;
        }
    }

    return steps
}

console.log("Part One - simple test: ", findPathFromAAAToZZZ(simpleInput1) === simpleAnswerPartOne1);
console.log("Part One - simple test: ", findPathFromAAAToZZZ(simpleInput2) === simpleAnswerPartOne2);
console.log("Part One - real test: ", findPathFromAAAToZZZ(input) === answerPartOne);

// --- Part Two ---

// Greatest Common Divisor
const gcd = (a, b) => a ? gcd(b % a, a) : b;

// Least Common Multiple
const lcm = (a, b) => a * b / gcd(a, b);

const findAllPathsFromAAAToZZZ = input => {
    const formattedInput = input.split("\n");
    const commands = formattedInput[0].split("");
    const map = formattedInput
        .slice(2)
        .map(line => line.split(" = "))
        .reduce((result, [key, pair]) => {
            const leftRightPair = pair.substring(1, pair.length - 1).split(", ");
            result[key] = { L: leftRightPair[0], R: leftRightPair[1] };
            return result;
        }, {});

    let currentKeys = Object.keys(map).filter(key => key[2] === "A");
    let pathForEveryKey = [];

    currentKeys.forEach(currentKey => {
        let localCurrentKey = currentKey;
        let steps = 0;
        let currentCommandIndex = 0;

        while (localCurrentKey[2] !== "Z") {
            localCurrentKey = map[localCurrentKey][commands[currentCommandIndex]];

            steps++;
            currentCommandIndex++;

            if (currentCommandIndex === commands.length) {
                currentCommandIndex = 0;
            }
        }

        pathForEveryKey.push(steps);
    })

    return pathForEveryKey.reduce(lcm);
}

console.log("Part One - simple test: ", findAllPathsFromAAAToZZZ(simpleInput3) === simpleAnswerPartTwo);
console.log("Part One - real test: ", findAllPathsFromAAAToZZZ(input) === answerPartTwo);
