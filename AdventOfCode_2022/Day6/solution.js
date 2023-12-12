const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
const simpleInput1 = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
const simpleInput2 = `nppdvjthqldpwncqszvftbrmjlhg`;
const simpleInput3 = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;
const simpleInput4 = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;

const simpleAnswerPartOne = 7;
const simpleAnswer1PartOne = 5;
const simpleAnswer2PartOne = 6;
const simpleAnswer3PartOne = 10;
const simpleAnswer4PartOne = 11;

const simpleAnswerPartTwo = 19;
const simpleAnswer1PartTwo = 23;
const simpleAnswer2PartTwo = 23;
const simpleAnswer3PartTwo = 29;
const simpleAnswer4PartTwo = 26;

const markerLengthPartOne = 4;
const markerLengthPartTwo = 14;

// --- Part One ---
const findFirstStartOfPacketMarkerPosition = input => input
    .split("")
    .findIndex((symbol, i, signal) => {
        const possibleMarker = signal.slice(i, i + markerLengthPartOne);
        return possibleMarker.every(char => possibleMarker.filter(s => s === char).length === 1);
    }) + markerLengthPartOne;

console.log("Part One - simple test: ", findFirstStartOfPacketMarkerPosition(simpleInput) === simpleAnswerPartOne);
console.log("Part One - simple test 1: ", findFirstStartOfPacketMarkerPosition(simpleInput1) === simpleAnswer1PartOne);
console.log("Part One - simple test 2: ", findFirstStartOfPacketMarkerPosition(simpleInput2) === simpleAnswer2PartOne);
console.log("Part One - simple test 3: ", findFirstStartOfPacketMarkerPosition(simpleInput3) === simpleAnswer3PartOne);
console.log("Part One - simple test 4: ", findFirstStartOfPacketMarkerPosition(simpleInput4) === simpleAnswer4PartOne);
console.log("Part One - real test: ", findFirstStartOfPacketMarkerPosition(input) === answerPartOne);

// --- Part Two ---
const findFirstStartOfMessageMarkerPosition = input => input
    .split("")
    .findIndex((symbol, i, signal) => {
        const possibleMarker = signal.slice(i, i + markerLengthPartTwo);
        return possibleMarker.every(char => possibleMarker.filter(s => s === char).length === 1);
    }) + markerLengthPartTwo;

console.log("Part Two - simple test: ", findFirstStartOfMessageMarkerPosition(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - simple test: ", findFirstStartOfMessageMarkerPosition(simpleInput1) === simpleAnswer1PartTwo);
console.log("Part Two - simple test: ", findFirstStartOfMessageMarkerPosition(simpleInput2) === simpleAnswer2PartTwo);
console.log("Part Two - simple test: ", findFirstStartOfMessageMarkerPosition(simpleInput3) === simpleAnswer3PartTwo);
console.log("Part Two - simple test: ", findFirstStartOfMessageMarkerPosition(simpleInput4) === simpleAnswer4PartTwo);
console.log("Part Two - real test: ", findFirstStartOfMessageMarkerPosition(input) === answerPartTwo);
