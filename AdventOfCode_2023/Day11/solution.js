const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const simpleAnswerPartOne = 374;
const simpleAnswerPartTwo1 = 1030;
const simpleAnswerPartTwo2 = 8410;

// --- Part One ---
const sumPathsBetweenUniverses = input => {
    let originalMap = input.split("\n");
    let map = input.split("\n");

    let howManyEmptyLinesWasFound = 0

    originalMap.forEach((line, i) => {
        if (line.indexOf("#") === -1) {
            map.splice(i + 1 + howManyEmptyLinesWasFound, 0, line);
            howManyEmptyLinesWasFound++;
        }
    })

    howManyEmptyLinesWasFound = 0;
    originalMap = originalMap.map(line => line.split(""));
    map = map.map(line => line.split(""));

    originalMap[0].forEach((_, i) => {
        if (originalMap.every(line => line[i] === ".")) {
            map = map.map(line => { line.splice(i + 1 + howManyEmptyLinesWasFound, 0, "."); return line; });
            howManyEmptyLinesWasFound++;
        }
    })

    const universes = [];

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === "#") {
                universes.push({ x: x, y: y });
            }
        }
    }

    let sumOfPaths = 0;

    for (let i = 0; i < universes.length; i++) {
        for (let j = i + 1; j < universes.length; j++) {
            sumOfPaths += Math.abs(universes[i].x - universes[j].x) + Math.abs(universes[i].y - universes[j].y);
        }
    }

    return sumOfPaths;
}

console.log("Part One - simple test: ", sumPathsBetweenUniverses(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", sumPathsBetweenUniverses(input) === answerPartOne);

// --- Part Two ---
const distance10 = 10;
const distance100 = 100;
const distance1M = 1000000;

const sumPathsBetweenUniversesForOlderOne = (input, distance) => {
    let map = input.split("\n").map(line => line.split(""));

    const verticalEmptyLinesIndexes = [];
    const horizontalEmptyLinesIndexes = [];

    map.forEach((line, i) => {
        if (line.indexOf("#") === -1) {
            horizontalEmptyLinesIndexes.push(i);
        }
    })

    map[0].forEach((_, i) => {
        if (map.every(line => line[i] === ".")) {
            verticalEmptyLinesIndexes.push(i);
        }
    })

    const universes = [];

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === "#") {
                universes.push({ x: x, y: y });
            }
        }
    }


    let sumOfPaths = 0;

    for (let i = 0; i < universes.length; i++) {
        for (let j = i + 1; j < universes.length; j++) {
            const universeIX = verticalEmptyLinesIndexes.filter(value => value < universes[i].x).length * (distance - 1) + universes[i].x;
            const universeJX = verticalEmptyLinesIndexes.filter(value => value < universes[j].x).length * (distance - 1) + universes[j].x;
            const universeIY = horizontalEmptyLinesIndexes.filter(value => value < universes[i].y).length * (distance - 1) + universes[i].y;
            const universeJY = horizontalEmptyLinesIndexes.filter(value => value < universes[j].y).length * (distance - 1) + universes[j].y;
            sumOfPaths += Math.abs(universeIX - universeJX) + Math.abs(universeIY - universeJY);
        }
    }

    return sumOfPaths;
}

console.log("Part Two - simple test: ", sumPathsBetweenUniversesForOlderOne(simpleInput, distance10) === simpleAnswerPartTwo1);
console.log("Part Two - simple test: ", sumPathsBetweenUniversesForOlderOne(simpleInput, distance100) === simpleAnswerPartTwo2);
console.log("Part Two - real test: ", sumPathsBetweenUniversesForOlderOne(input, distance1M) === answerPartTwo);
