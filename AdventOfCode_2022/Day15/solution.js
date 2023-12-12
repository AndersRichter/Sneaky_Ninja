const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

const simpleAnswerPartOne = 26;
const simpleAnswerPartTwo = 56000011;

const simpleInputTargetLine = 10;
const inputTargetLine = 2000000;

const beaconSymbol = "B";
const emptySymbol = "#";

const getDistance = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

// --- Part One ---
const countSandUnitsInRest = (input, targetLineNumber) => {
    const sensorsAndBeacons = input.split("\n")
        .map(line => line
            .split(" at x=").join()
            .split(", y=").join()
            .split(": closest beacon is").join()
            .split(",")
        ).map(line => ({ sensorX: +line[1], sensorY: +line[2], beaconX: +line[4], beaconY: +line[5] }))
        .map(line => ({ ...line, distance: getDistance(line.sensorX, line.sensorY, line.beaconX, line.beaconY) })) // calculate distance between sensor and beacon
        .map(line => ({
            ...line,
            canReachTargetLine: line.sensorY > targetLineNumber
                ? (line.sensorY - line.distance) <= targetLineNumber
                : (line.sensorY + line.distance) >= targetLineNumber,
        }));

    const targetLine = [];

    // draw beacons on target line
    sensorsAndBeacons.forEach(sensorAndBeacon => {
        if (sensorAndBeacon.beaconY === targetLineNumber) {
            targetLine[sensorAndBeacon.beaconX] = beaconSymbol;
        }
    })

    // draw empty places
    sensorsAndBeacons.filter(sensorAndBeacon => sensorAndBeacon.canReachTargetLine).forEach(sensorAndBeacon => {
        const distanceBetweenSensorAndTargetLine = Math.abs(sensorAndBeacon.sensorY - targetLineNumber);
        // empty cells around the sensor form an isosceles rhombus, half of the rhombus forms an isosceles triangle.
        // The line of empty cells on the target line is proportional in length to the base of the triangle.
        // We consider half of this line to draw it in a loop in both directions
        const halfOfEmptySpaceOfTargetLine = sensorAndBeacon.distance - distanceBetweenSensorAndTargetLine;

        for (let i = sensorAndBeacon.sensorX - halfOfEmptySpaceOfTargetLine; i <= sensorAndBeacon.sensorX + halfOfEmptySpaceOfTargetLine; i++ ) {
            if (targetLine[i] !== beaconSymbol) {
                targetLine[i] = emptySymbol;
            }
        }
    })

    // targetLine can contain negative indexes, so we should use Object.values to count them
    return Object.values(targetLine).filter(symbol => symbol === emptySymbol).length;
};

console.log("Part One - simple test: ", countSandUnitsInRest(simpleInput, simpleInputTargetLine) === simpleAnswerPartOne);
console.log("Part One - real test: ", countSandUnitsInRest(input, inputTargetLine) === answerPartOne);

const lowLimit = 0;
const inputHighLimit = 4000000;
const multiplier = 4000000;
const simpleInputHighLimit = 20;

// vector of x and y coordinates while moving from:
const peakToPeakDirections = [
    [1, -1],   // left ot top
    [1, 1],    // top to right
    [-1, 1],   // right to bottom
    [-1, -1],  // bottom to left
];

// --- Part Two ---
const findPossiblePositionForBeacon = (input, highLimit) => {
    const sensorsAndBeacons = input.split("\n")
        .map(line => line
            .split(" at x=").join()
            .split(", y=").join()
            .split(": closest beacon is").join()
            .split(",")
        ).map(line => ({ sensorX: +line[1], sensorY: +line[2], beaconX: +line[4], beaconY: +line[5] }))
        .map(line => ({ ...line, distance: getDistance(line.sensorX, line.sensorY, line.beaconX, line.beaconY) })); // calculate distance between sensor and beacon

    for (let j = 0; j < sensorsAndBeacons.length; j++) {
        const sensor = sensorsAndBeacons[j];

        // empty cells around the sensor form an isosceles rhombus with 4 peaks. It's useless to check points inside this rhombus,
        // so we should check only points outside it.
        const leftPeakOutside = [sensor.sensorX - (sensor.distance + 1), sensor.sensorY];
        const rightPeakOutside = [sensor.sensorX + (sensor.distance + 1), sensor.sensorY];
        const topPeakOutside = [sensor.sensorX, sensor.sensorY - (sensor.distance + 1)];
        const bottomPeakOutside = [sensor.sensorX, sensor.sensorY + (sensor.distance + 1)];
        const allPeaks = [leftPeakOutside, topPeakOutside, rightPeakOutside, bottomPeakOutside];

        // cycle through all points contained in rhombus outside border
        //                 . <- top peak
        //             -> .#. <-
        //            -> .###. <-
        //           -> .#####. <-
        // left peak-> .#######. <- right peak
        //           -> .#####. <-
        for (let i = 0; i < allPeaks.length; i++) {
            const startPeak = [...allPeaks[i]];
            const endPeak = allPeaks[i + 1] ? [...allPeaks[i + 1]] : [...allPeaks[0]];

            while (startPeak[0] !== endPeak[0] && startPeak[1] !== endPeak[1]) {
                const [x, y] = startPeak;
                if (
                    x >= lowLimit && x <= highLimit &&
                    y >= lowLimit && y <= highLimit &&
                    sensorsAndBeacons.every(sensor => getDistance(sensor.sensorX, sensor.sensorY, x, y) > sensor.distance)
                ) {
                    return x * multiplier + y;
                }

                startPeak[0] += peakToPeakDirections[i][0];
                startPeak[1] += peakToPeakDirections[i][1];
            }
        }
    }

    return 0;
};

console.log("Part Two - simple test: ", findPossiblePositionForBeacon(simpleInput, simpleInputHighLimit) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", findPossiblePositionForBeacon(input, inputHighLimit) === answerPartTwo);
