const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const simpleInput1 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

const simpleAnswerPartOne = 13;
const simpleAnswerPartTwo = 1;
const simpleAnswer1PartTwo = 36;

const visited = "#";

const isConnected = (head, tail) => Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1;

const smartRound = num => num > 0 ? Math.ceil(num) : Math.floor(num);

const moveTail = (head, tail) => {
    const movingVector = [(head[0] - tail[0]) / 2, (head[1] - tail[1]) / 2]; // 0 -> 0, 1 -> 0.5, 2 -> 1, -1 -> -0.5, -2 -> -1
    const roundedVector = [smartRound(movingVector[0]), smartRound(movingVector[1])] // 0 -> 0, 0.5 -> 1, 1 -> 1, -0.5 -> -1, -1 -> -1
    return [tail[0] + roundedVector[0], tail[1] + roundedVector[1]];
}

const moveHead = (head, direction) => {
    switch (direction) {
        case "R":
            return [head[0] + 1, head[1]];
        case "D":
            return [head[0], head[1] - 1];
        case "L":
            return [head[0] - 1, head[1]];
        case "U":
            return [head[0], head[1] + 1];
        default:
            return [...head];
    }
}

const countVisited = field => {
    let visitedCount = 0;

    // field may contain negative indexes, so we can't use array methods like reduce
    Object.values(field).forEach(line => {
        Object.values(line).forEach(value => {
            if (value === visited) {
                visitedCount++;
            }
        })
    })

    return visitedCount;
}

// --- Part One ---
const countPositionsTailOfTheRopeVisited = input => {
    const moves = input.split("\n").map(line => line.split(" "));
    let H = [0, 0]; // position of Head
    let T = [0, 0]; // position of Tail
    const field = [[visited]];

    moves.forEach(([direction, distance]) => {
        for (let i = 0; i < +distance; i++) {
            H = moveHead(H, direction);
            if (!isConnected(H, T)) {
                T = moveTail(H, T);

                if (!field[T[1]]) {
                    field[T[1]] = [];
                }
                field[T[1]][T[0]] = visited;
            }
        }
    })

    return countVisited(field);
};

console.log("Part One - simple test: ", countPositionsTailOfTheRopeVisited(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", countPositionsTailOfTheRopeVisited(input) === answerPartOne);

const knotsAmount = 10;

// --- Part Two ---
const countPositionsTailVisitedSeveralKnots = input => {
    const moves = input.split("\n").map(line => line.split(" "));
    const field = [[visited]];
    const knots = [];

    for (let i = 0; i < knotsAmount; i++) {
        knots.push([0, 0]);
    }

    moves.forEach(([direction, distance]) => {
        for (let i = 0; i < +distance; i++) {
            knots[0] = moveHead(knots[0], direction);
            for (let j = 1; j < knotsAmount; j++) {
                if (!isConnected(knots[j - 1], knots[j])) {
                    knots[j] = moveTail(knots[j - 1], knots[j]);

                    if (j === knotsAmount - 1) {
                        if (!field[knots[j][1]]) {
                            field[knots[j][1]] = [];
                        }
                        field[knots[j][1]][knots[j][0]] = visited;
                    }
                }
            }
        }
    })

    return countVisited(field);
};

console.log("Part Two - simple test: ", countPositionsTailVisitedSeveralKnots(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - simple test 1: ", countPositionsTailVisitedSeveralKnots(simpleInput1) === simpleAnswer1PartTwo);
console.log("Part Two - real test: ", countPositionsTailVisitedSeveralKnots(input) === answerPartTwo);
