const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const simpleAnswerPartOne = "CMZ";
const simpleAnswerPartTwo = "MCD";

const formatStackFromInputString = input => {
    /*
        [D]       [ [ '', 'D', '' ],
    [N] [C]         [ 'N', 'C', '' ],
    [Z] [M] [P] ->  [ 'Z', 'M', 'P' ] ]
    1   2   3
    */
    const cratesStack = input
        .split("\n\n")[0]
        .split("\n")
        .map(value => value.replaceAll("    ", " ")) // 4 spaces -> 1 space
        .map(value => value.split(" ")) // " A " -> ["", "A", ""]
        .slice(0, -1) // remove last line with numbers " 1  2  3 ... "
        .map(value => value.map(crate => crate ? crate[1] : crate)); // "[A]" -> "A"

    const rotatedStack = [];

    /*
    rotate crates stack for more comfortable handling, columns becomes lines
    [ [ '', 'D', '' ],      [ [ 'Z', 'N', '' ],
      [ 'N', 'C', '' ],       [ 'M', 'C', 'D' ],
      [ 'Z', 'M', 'P' ] ] ->  [ 'P', '', '' ] ]
    */
    cratesStack.forEach((cratesLine, i) => {
        cratesLine.forEach((crate, j) => {
            if (!rotatedStack[j]) {
                rotatedStack[j] = [];
            }
            rotatedStack[j][cratesStack.length - 1 - i] = crate;
        })
    })

    /*
    [ [ 'Z', 'N', '' ],     [ [ 'Z', 'N' ],
      [ 'M', 'C', 'D' ], ->   [ 'M', 'C', 'D' ],
      [ 'P', '', '' ] ]       [ 'P' ] ]
    */
    return  rotatedStack.map(line => line.filter(crate => !!crate));
}

const formatCommandsFromInputString = input => input
    .split("\n\n")[1]
    .split("\n")
    .map(value => value.split(" "))
    .map(command => ({ amount: +command[1], from: +command[3], to: +command[5] }));

const getLastCratesOfEachColumn = stack => stack.map(cratesColumn => cratesColumn[cratesColumn.length - 1]).join("");

// --- Part One ---
const findCratesOfTopOfEachStack9000 = input => {
    const stack = formatStackFromInputString(input);
    const commands = formatCommandsFromInputString(input);

    commands.forEach(command => {
        for (let i = 0; i < command.amount; i ++) {
            stack[command.to - 1].push(stack[command.from - 1].pop());
        }
    });

    return getLastCratesOfEachColumn(stack);
}

console.log("Part One - simple test: ", findCratesOfTopOfEachStack9000(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", findCratesOfTopOfEachStack9000(input) === answerPartOne);

// --- Part Two ---
const findCratesOfTopOfEachStack9001 = input => {
    const stack = formatStackFromInputString(input);
    const commands = formatCommandsFromInputString(input);

    commands.forEach(command => {
        stack[command.to - 1].push(...stack[command.from - 1].splice(-command.amount, command.amount));
    });

    return getLastCratesOfEachColumn(stack);
}

console.log("Part Two - simple test: ", findCratesOfTopOfEachStack9001(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", findCratesOfTopOfEachStack9001(input) === answerPartTwo);
