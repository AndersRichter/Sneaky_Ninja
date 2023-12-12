const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const simpleAnswerPartOne = 4361;
const simpleAnswerPartTwo = 467835;

const deltas = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
];

const checkIfConnected = (x, y, map) => deltas.some(([deltaX, deltaY]) => {
    const value = map[y + deltaY]?.[x + deltaX];
    return !!value && value !== "." && isNaN(value);
})

// --- Part One ---
const findEngineParts = input => {
    let result = 0;
    let currentNumber = 0;
    let isConnected = false;

    const engine = input.split("\n").map(line => line.split(""));

    const handleEndOfCurrentNumber = () => {
        if (isConnected) {
            result += currentNumber;
            isConnected = false;
        }
        currentNumber = 0;
    }

    engine.forEach((line, y) =>
        line.forEach((symbol, x) => {
            if (!isNaN(symbol)) { // it is number
                currentNumber = +`${currentNumber}${symbol}`;
                isConnected = isConnected || checkIfConnected(x, y, engine);
            } else { // is is dot or other symbol
                handleEndOfCurrentNumber();
            }

            if (x === line.length - 1) {
                handleEndOfCurrentNumber();
            }
        })
    )

    return result;
}

console.log("Part One - simple test: ", findEngineParts(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", findEngineParts(input) === answerPartOne);

// --- Part Two ---
const gearSymbol = "*";

const findConnectedGearKey = (x, y, map) => {
    for (let i = 0; i < deltas.length; i++) {
        const currentX = x + deltas[i][0];
        const currentY = y + deltas[i][1];

        if (map[currentY]?.[currentX] === gearSymbol) {
            return `${currentX}-${currentY}`; // gear key
        }
    }

    return null;
}

const getSumOfGearRatios = input => {
    let currentNumber = 0;
    const gearKeysByNumbers = {}; // format: { gear_x-gear_y: [123, 456, ...], ... }
    let gearKeysConnectedToCurrentNumber = []; // format: ["gear_x1-gear_y1", "gear_x2-gear_y2", ...]

    const engine = input.split("\n").map(line => line.split(""));

    const handleEndOfCurrentNumber = () => {
        if (gearKeysConnectedToCurrentNumber.length) {
            gearKeysConnectedToCurrentNumber.forEach(gearKey => {
                if (gearKeysByNumbers[gearKey]) {
                    gearKeysByNumbers[gearKey].push(currentNumber);
                } else {
                    gearKeysByNumbers[gearKey] = [currentNumber];
                }
            })
        }
        gearKeysConnectedToCurrentNumber = [];
        currentNumber = 0;
    }

    engine.forEach((line, y) =>
        line.forEach((symbol, x) => {
            if (!isNaN(symbol)) { // it is number
                currentNumber = +`${currentNumber}${symbol}`;
                const connectedGear = findConnectedGearKey(x, y, engine);

                if (connectedGear && !gearKeysConnectedToCurrentNumber.find(gearKey => gearKey === connectedGear)) {
                    gearKeysConnectedToCurrentNumber.push(connectedGear);
                }
            } else { // is is dot or other symbol
                handleEndOfCurrentNumber();
            }

            if (x === line.length - 1) {
                handleEndOfCurrentNumber();
            }
        })
    )

    return Object.entries(gearKeysByNumbers)
        .filter(([, numbersArray]) => numbersArray.length === 2)
        .reduce((sum, [, numbersArray]) => sum + numbersArray[0] * numbersArray[1], 0);
}

console.log("Part Two - simple test: ", getSumOfGearRatios(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", getSumOfGearRatios(input) === answerPartTwo);
