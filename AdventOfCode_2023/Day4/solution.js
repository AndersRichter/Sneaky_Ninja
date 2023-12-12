const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const simpleAnswerPartOne = 13;
const simpleAnswerPartTwo = 30;

const getWinningNumbersByCard = input => input
    .split("\n")
    .map(line => line.split(": ")[1])
    .map(line => line.split(" | "))
    .map(cardSides => cardSides.map(side => side.split(" ").filter(number => !!number).map(number => +number)))
    .map(cardSides => {
        cardSides[1] = cardSides[1].filter(number => cardSides[0].findIndex(num => num === number) !== -1)
        return cardSides;
    });

// --- Part One ---
const calculateWinningPoints = input => getWinningNumbersByCard(input)
    .reduce((sum, cardSides) => sum + (cardSides[1].length ? 2 ** (cardSides[1].length - 1) : 0), 0)
;

console.log("Part One - simple test: ", calculateWinningPoints(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", calculateWinningPoints(input) === answerPartOne);

// --- Part Two ---
const calculateScratchcardsAmount = input => {
    const winningsNumbers = getWinningNumbersByCard(input);
    const copies = new Array(winningsNumbers.length).fill(0);

    winningsNumbers.forEach((card, i) => {
        for (let k = 0; k < copies[i] + 1; k++) {
            card[1].forEach((_, j) => {
                copies[i + j + 1]++;
            })
        }
    })

    return copies.reduce((sum, value) => sum + value, 0) + winningsNumbers.length;
}

console.log("Part Two - simple test: ", calculateScratchcardsAmount(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", calculateScratchcardsAmount(input) === answerPartTwo);
