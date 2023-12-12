const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const simpleAnswerPartOne = 24;
const simpleAnswerPartTwo = 93;

const stoneSymbol = "#";
const sandSymbol = "o";
const sandStartPoint = [500, 0];

// --- Part One ---
const countSandUnitsInRest = (input, taskPart) => {
    const stones = input.split("\n").map(line => line.split(" -> ").map(cords => cords.split(",").map(Number)).reverse());
    let scan = [];
    let minX = Number.MAX_VALUE;
    let maxY = 0;
    let sandUnitsOnRest = 0;
    let isSandFallsIntoAbyss = false;

    // draw stones
    stones.forEach(stone => {
        stone.forEach((coordinates, i) => {
            const nextCoordinates = stone[i + 1];

            if (nextCoordinates) {
                const x = coordinates[0];
                const y = coordinates[1];
                const nextX = nextCoordinates[0];
                const nextY = nextCoordinates[1];

                if (x < minX) { minX = x; }
                if (y > maxY) { maxY = y; }

                if (x === nextX) { // draw column
                    const startY = Math.min(y, nextY);
                    const endY = Math.max(y, nextY);
                    for (let i = startY; i <= endY; i++) {
                        if (!scan[i]) { scan[i] = []; }
                        scan[i][x] = stoneSymbol;
                    }
                } else { // y coordinates are equal -> draw row
                    if (!scan[y]) { scan[y] = []; }
                    const startX = Math.min(x, nextX);
                    const endX = Math.max(x, nextX);
                    for (let i = startX; i <= endX; i++) {
                        scan[y][i] = stoneSymbol;
                    }
                 }
            }
        })
    })

    while (!isSandFallsIntoAbyss && !scan[sandStartPoint[1]]?.[sandStartPoint[0]]) { // if sand start point is still available to produce new sand unit
        let sandUnit = [...sandStartPoint];
        let isSandUnitOnRest = false;

        while (!isSandUnitOnRest) {
            if (taskPart === 1 && sandUnit[1] > maxY) {
                isSandFallsIntoAbyss = true;
                break;
            }

            if (taskPart === 1 || (taskPart ===2 && sandUnit[1] + 1 < maxY + 2)) { // if sand unit still does not lay on the floor
                if (!scan[sandUnit[1] + 1]?.[sandUnit[0]]) { // one step down move if possible
                    sandUnit[1]++;
                    continue;
                }

                if (!scan[sandUnit[1] + 1]?.[sandUnit[0] - 1]) { // one step down and to the left move if possible
                    sandUnit[0]--;
                    sandUnit[1]++;
                    continue;
                }

                if (!scan[sandUnit[1] + 1]?.[sandUnit[0] + 1]) { // one step down and to the right move if possible
                    sandUnit[0]++;
                    sandUnit[1]++;
                    continue;
                }
            }

            isSandUnitOnRest = true;
            sandUnitsOnRest++;
            if (!scan[sandUnit[1]]) { scan[sandUnit[1]] = []; }
            scan[sandUnit[1]][sandUnit[0]] = sandSymbol;
        }
    }

    return sandUnitsOnRest;
};

console.log("Part One - simple test: ", countSandUnitsInRest(simpleInput, 1) === simpleAnswerPartOne);
console.log("Part One - real test: ", countSandUnitsInRest(input, 1) === answerPartOne);

// --- Part Two ---

console.log("Part Two - simple test: ", countSandUnitsInRest(simpleInput, 2) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", countSandUnitsInRest(input, 2) === answerPartTwo);
