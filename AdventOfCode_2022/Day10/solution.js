const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const simpleAnswerPartOne = 13140;

const noop = "noop";
const keyCycles = [20, 60, 100, 140, 180, 220];

// --- Part One ---
const sumOfSignalStrengths = input => {
    const commands = input.split("\n").map(line => line.split(" "));
    let currentCycle = 0;
    let X = 1;
    let valueToAdd = 0;
    let sum = 0;

    const checkSum = () => {
        if (keyCycles.includes(currentCycle)) {
            sum += currentCycle * X;
        }
    }

    commands.forEach(command => {
        X += valueToAdd;

        if (command[0] === noop) {
            valueToAdd = 0;
            currentCycle++;
        } else { // addx
            valueToAdd = +command[1];
            currentCycle++;
            checkSum();
            currentCycle++;
        }

        checkSum();
    })

    return sum;
};

console.log("Part One - simple test: ", sumOfSignalStrengths(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", sumOfSignalStrengths(input) === answerPartOne);

const width = 40;
const height = 6;
const pixel = "#";
const black = ".";
const sprite = "_";
const spriteLength = 3;
const halfOfSprite = Math.floor(spriteLength / 2);

// --- Part Two ---
const renderImage = input => {
    const commands = input.split("\n").map(line => line.split(" "));
    const image = [];
    let currentCycle = 0;
    let currentLine = 0;
    let X = 1;
    let valueToAdd = 0;

    for (let i = 0; i < height; i++) {
        image.push([]);
    }

    const drawPixel = () => {
        currentLine = Math.floor(currentCycle / width);
        image[currentLine][currentCycle % width] === sprite ? image[currentLine][currentCycle % width] = pixel : image[currentLine][currentCycle % width] = black;
    }

    commands.forEach(command => {
        // clear old sprite
        for (let i = -halfOfSprite; i <= halfOfSprite; i++) {
            if (image[currentLine][X + i] === sprite) {
                image[currentLine][X + i] = "";
            }
        }

        X += valueToAdd;

        // draw sprite
        for (let i = -halfOfSprite; i <= halfOfSprite; i++) {
            if (!image[currentLine][X + i]) {
                image[currentLine][X + i] = sprite;
            }
        }

        drawPixel();

        if (command[0] === noop) {
            valueToAdd = 0;
            currentCycle++;
        } else { // addx
            valueToAdd = +command[1];
            currentCycle++;
            drawPixel();
            currentCycle++;
        }
    })

    return image.map(line => line.join(""));
};

console.log("Part Two - simple test: ", renderImage(simpleInput));
console.log("Part Two - real test: ", renderImage(input));
