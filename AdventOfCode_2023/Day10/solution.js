const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput1 = `.....
.S-7.
.|.|.
.L-J.
.....`;

const simpleInput2 = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const simpleInput3 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

const simpleInput4 = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

const simpleAnswerPartOne1 = 4;
const simpleAnswerPartOne2 = 8;

const top = "top";
const right = "right";
const bottom = "bottom";
const left = "left";

const tilesConnections = {
    "|": [top, bottom],
    "-": [left, right],
    L: [top, right],
    J: [top, left],
    7: [bottom, left],
    F: [bottom, right],
    ".": [],
    "S": [],
}

const coordsDeltasByConnections = {
    [top]: { x: 0, y: -1 },
    [right]: { x: 1, y: 0 },
    [bottom]: { x: 0, y: 1 },
    [left]: { x: -1, y: 0 },
}

const getStartPosition = map => {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (map[y][x] === "S") {
                return { x: x, y: y };
            }
        }
    }
    return { x: 0, y: 0 };
}

const oppositeConnections = {
    [top]: bottom,
    [right]: left,
    [bottom]: top,
    [left]: right,
}

const getStartRealSymbol = (map, position) => {
    const connections = [];
    if (tilesConnections[map[position.y + coordsDeltasByConnections[top].y]?.[position.x + coordsDeltasByConnections[top].x]]?.includes(oppositeConnections[top])) connections.push(top);
    if (tilesConnections[map[position.y + coordsDeltasByConnections[right].y]?.[position.x + coordsDeltasByConnections[right].x]]?.includes(oppositeConnections[right])) connections.push(right);
    if (tilesConnections[map[position.y + coordsDeltasByConnections[bottom].y]?.[position.x + coordsDeltasByConnections[bottom].x]]?.includes(oppositeConnections[bottom])) connections.push(bottom);
    if (tilesConnections[map[position.y + coordsDeltasByConnections[left].y]?.[position.x + coordsDeltasByConnections[left].x]]?.includes(oppositeConnections[left])) connections.push(left);

    return Object.keys(tilesConnections)
        .find(key => tilesConnections[key].includes(connections[0]) && tilesConnections[key].includes(connections[1]));
}

// --- Part One ---
const findTheBiggestLoopAndFarthestPoint = input => {
    const map = input.split("\n").map(line => line.split(""));
    const startPosition = getStartPosition(map);
    const startRealSymbol = getStartRealSymbol(map, startPosition);

    let currentPosition = {...startPosition};
    let currentSymbol = startRealSymbol;
    let nextConnection = tilesConnections[startRealSymbol][0];
    let loopLength = 0;

    while (currentSymbol !== "S") {
        currentPosition = {
            x: currentPosition.x + coordsDeltasByConnections[nextConnection].x,
            y: currentPosition.y + coordsDeltasByConnections[nextConnection].y,
        };
        currentSymbol = map[currentPosition.y][currentPosition.x];
        nextConnection = tilesConnections[currentSymbol].filter(connection => connection !== oppositeConnections[nextConnection])[0];
        loopLength++;
    }

    return loopLength / 2;
}

console.log("Part One - simple test: ", findTheBiggestLoopAndFarthestPoint(simpleInput1) === simpleAnswerPartOne1);
console.log("Part One - simple test: ", findTheBiggestLoopAndFarthestPoint(simpleInput2) === simpleAnswerPartOne1);
console.log("Part One - simple test: ", findTheBiggestLoopAndFarthestPoint(simpleInput3) === simpleAnswerPartOne2);
console.log("Part One - simple test: ", findTheBiggestLoopAndFarthestPoint(simpleInput4) === simpleAnswerPartOne2);
console.log("Part One - real test: ", findTheBiggestLoopAndFarthestPoint(input) === answerPartOne);

// --- Part Two ---
const simpleInput5 = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

const simpleInput6 = `..........
.S------7.
.|F----7|.
.||OOOO||.
.||OOOO||.
.|L-7F-J|.
.|II||II|.
.L--JL--J.
..........`;

const simpleInput7 = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;

const simpleInput8 = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJIF7FJ-
L---JF-JLJIIIIFJLJJ7
|F|F-JF---7IIIL7L|7|
|FFJF7L7F-JF7IIL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

const simpleAnswerPartTwo1 = 4;
const simpleAnswerPartTwo2 = 8;
const simpleAnswerPartTwo3 = 10;

const isCorner = symbol => ["F", "7", "L", "J"].includes(symbol);

// Ray Casting Algorithm https://en.wikipedia.org/wiki/Point_in_polygon
// function from https://stackoverflow.com/questions/22521982/check-if-point-is-inside-a-polygon
const inside = ([x, y], vs) => {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html

    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0], yi = vs[i][1];
        let xj = vs[j][0], yj = vs[j][1];

        let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

const countSymbolsInsideLoop = input => {
    const map = input.split("\n").map(line => line.split(""));
    const startPosition = getStartPosition(map);
    const startRealSymbol = getStartRealSymbol(map, startPosition);

    let currentPosition = {...startPosition};
    let currentSymbol = startRealSymbol;
    let nextConnection = tilesConnections[startRealSymbol][0];
    let symbolsInside = 0;

    const cornersCoords = [];

    while (currentSymbol !== "S") {
        currentPosition = {
            x: currentPosition.x + coordsDeltasByConnections[nextConnection].x,
            y: currentPosition.y + coordsDeltasByConnections[nextConnection].y,
        };
        currentSymbol = map[currentPosition.y][currentPosition.x];
        nextConnection = tilesConnections[currentSymbol].filter(connection => connection !== oppositeConnections[nextConnection])[0];

        if (isCorner(currentSymbol)) {
            map[currentPosition.y][currentPosition.x] = "C";
            cornersCoords.push([currentPosition.x, currentPosition.y]);
        } else {
            map[currentPosition.y][currentPosition.x] = "S";
        }
    }

    if (isCorner(startRealSymbol)) {
        map[startPosition.y][startPosition.x] = "C";
        cornersCoords.push([startPosition.x, startPosition.y]);
    }


    // I tried to implement Ray casting algorithm by myself, but was stacked with edge case when my ray cast goes through the corner
    // ...........
    // .CSSSSSSSC.
    // .SCSSSSSCS.
    // .SS.....SS.
    // .SS.....SS.
    // .SCSC.CSCS.
    // .S++S+S++S. <--- wrong + in the middle
    // .CSSC.CSSC.
    // ...........

    // for (let y = 1; y < map.length - 1; y++) {
    //     for (let x = 1; x < map[0].length - 1; x++) {
    //         const symbol = map[y][x];
    //
    //         if (symbol === "S" || symbol === "C") continue;
    //
    //         const rayCast = [];
    //         let rayCastX = x + 1;
    //         let rayCastY = y + 1;
    //
    //         while (rayCastY < map.length && rayCastX < map[0].length) {
    //             const currentSymbol = map[rayCastY][rayCastX];
    //             // work separately with corners, because we can count them as 1 or 2 crossing
    //             // if (currentSymbol === "C") {
    //             //     const originalSymbolOfCorner = originalMap[rayCastY][rayCastX];
    //             //     const isSymbolInsideCorner =
    //             // } else {
    //                 rayCast.push(currentSymbol);
    //             // }
    //             rayCastY++;
    //             rayCastX++;
    //         }
    //
    //         const isOddRayCast = rayCast.filter(sym => sym === "S").length % 2 !== 0;
    //
    //         if (isOddRayCast) {
    //             symbolsInside++;
    //             map[y][x] = "+";
    //         }
    //     }
    // }

    for (let y = 1; y < map.length - 1; y++) {
        for (let x = 1; x < map[0].length - 1; x++) {
            const symbol = map[y][x];

            if (symbol === "S" || symbol === "C") continue;

            if (inside([x, y], cornersCoords)) {
                symbolsInside++;
                map[y][x] = "+";
            }
        }
    }

    return symbolsInside;
}

console.log("Part Two - simple test: ", countSymbolsInsideLoop(simpleInput5) === simpleAnswerPartTwo1);
console.log("Part Two - simple test: ", countSymbolsInsideLoop(simpleInput6) === simpleAnswerPartTwo1);
console.log("Part Two - simple test: ", countSymbolsInsideLoop(simpleInput7) === simpleAnswerPartTwo2);
console.log("Part Two - simple test: ", countSymbolsInsideLoop(simpleInput8) === simpleAnswerPartTwo3);
console.log("Part Two - real test: ", countSymbolsInsideLoop(input) === answerPartTwo);
