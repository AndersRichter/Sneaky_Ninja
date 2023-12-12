const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

const simpleAnswerPartOne = 13;
const simpleAnswerPartTwo = 140;

const compareTwoPackets = (left, right) => {
    for (let i = 0; i < left.length; i++) {
        const leftPack = left[i];
        const rightPack = right[i];

        // if left pack longer than right pack
        if (rightPack === undefined) {
            return 1;
        }

        // if both packs are numbers
        if (!Array.isArray(leftPack) && !Array.isArray(rightPack)) {
            if (leftPack === rightPack) {
                continue;
            }
            return leftPack - rightPack;
        }

        // if one of the left or right is array or both
        const result = compareTwoPackets(
            Array.isArray(leftPack) ? leftPack : [leftPack],
            Array.isArray(rightPack) ? rightPack : [rightPack],
        );
        if (result === 0) {
            continue;
        }
        return result;
    }

    // if left is equal to right, but it ends and right has other elements
    if (right.length > left.length) {
        return -1;
    }

    return 0;
}

// --- Part One ---
const sumOfPacketsInRightOrder = input => {
    const pairs = input.split("\n\n")
        .map(pair => pair.split("\n"))
        .map(pairOfStrings => pairOfStrings.map(string => JSON.parse(string)));

    return pairs.reduce((sum, pair, i) => {
        const result = compareTwoPackets(pair[0], pair[1]);
        return result < 0 ? sum + i + 1 : sum;
    }, 0);
};

console.log("Part One - simple test: ", sumOfPacketsInRightOrder(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", sumOfPacketsInRightOrder(input) === answerPartOne);

const firstDivider = [[2]];
const secondDivider = [[6]];

// --- Part Two ---
const sortPacketsAndFindDividers = input => {
    const pairs = input.split("\n\n")
        .map(pair => pair.split("\n"))
        .map(pairOfStrings => pairOfStrings.map(string => JSON.parse(string)))
        .flat(1);

    pairs.push(firstDivider);
    pairs.push(secondDivider);
    pairs.sort(compareTwoPackets);

    const firstIndex = pairs.findIndex(packet => packet === firstDivider) + 1;
    const secondIndex = pairs.findIndex(packet => packet === secondDivider) + 1;

    return firstIndex * secondIndex;
};

console.log("Part Two - simple test: ", sortPacketsAndFindDividers(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", sortPacketsAndFindDividers(input) === answerPartTwo);
