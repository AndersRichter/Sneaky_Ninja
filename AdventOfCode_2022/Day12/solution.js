const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const simpleAnswerPartOne = 31;
const simpleAnswerPartTwo = 29;

const start = "S";
const startSymbol = "a";
const end = "E";
const endSymbol = "z";

const directions = [
    { x: 0, y: 1 }, // top
    { x: 1, y: 0 }, // right
    { x: 0, y: -1 }, // down
    { x: -1, y: 0 }, // left
];

const isSafe = (heightmap, visited, fromX, fromY, toX, toY, reverseWay) =>
    toX >= 0 && toX < heightmap[0].length &&
    toY >= 0 && toY < heightmap.length &&
    !visited[toY]?.[toX] &&
    (reverseWay
        ? heightmap[fromY][fromX].codePointAt(0) - heightmap[toY][toX].codePointAt(0) <= 1
        : heightmap[toY][toX].codePointAt(0) - heightmap[fromY][fromX].codePointAt(0) <= 1
    );

const parseInput = (input, reverseWay) => {
    const heightmap = input.split("\n").map(line => line.split(""));

    const startY = heightmap.findIndex(line => line.includes(start));
    const startX = heightmap[startY].findIndex(height => height === start);
    const endY = heightmap.findIndex(line => line.includes(end));
    const endX = heightmap[endY].findIndex(height => height === end);

    heightmap[startY][startX] = startSymbol;
    heightmap[endY][endX] = endSymbol;

    return {
        heightmap,
        endX, endY,
        minPath: Number.MAX_VALUE,
        visited: [],
        queue: reverseWay ? [{ x: endX, y: endY, path: 0 }] : [{ x: startX, y: startY, path: 0 }],
    }
}

// --- Part One ---
const findTheShortestPath = input => {
    let { heightmap, endX, endY, minPath, visited, queue } = parseInput(input, false);

    while (queue.length > 0) {
        const currentPoint = queue.shift();

        if (currentPoint.x === endX && currentPoint.y === endY) {
            minPath = Math.min(currentPoint.path, minPath);
        }

        for (let i = 0; i < directions.length; i++) {
            const toY = currentPoint.y + directions[i].y;
            const toX = currentPoint.x + directions[i].x;

            if (isSafe(heightmap, visited, currentPoint.x, currentPoint.y, toX, toY, false)) {
                if (!visited[toY]) {
                    visited[toY] = [];
                }
                visited[toY][toX] = true;
                queue.push({ x: toX, y: toY, path: currentPoint.path + 1 });
            }
        }
    }

    return minPath;
};

console.log("Part One - simple test: ", findTheShortestPath(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", findTheShortestPath(input) === answerPartOne);

// --- Part Two ---
const findTheShortestPathToStart = input => {
    let { heightmap, minPath, visited, queue } = parseInput(input, true);

    while (queue.length > 0) {
        const currentPoint = queue.shift();

        if (heightmap[currentPoint.y][currentPoint.x] === startSymbol) {
            minPath = Math.min(currentPoint.path, minPath);
        }

        for (let i = 0; i < directions.length; i++) {
            const toY = currentPoint.y + directions[i].y;
            const toX = currentPoint.x + directions[i].x;

            if (isSafe(heightmap, visited, currentPoint.x, currentPoint.y, toX, toY, true)) {
                if (!visited[toY]) {
                    visited[toY] = [];
                }
                visited[toY][toX] = true;
                queue.push({ x: toX, y: toY, path: currentPoint.path + 1 });
            }
        }
    }

    return minPath;
};

console.log("Part Two - simple test: ", findTheShortestPathToStart(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", findTheShortestPathToStart(input) === answerPartTwo);
