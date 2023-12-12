const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

const simpleAnswerPartOne = 10605;
const simpleAnswerPartTwo = 2713310158;

const roundsPartOne = 20;
const reliefLevelPartOne = 3;

const roundsPartTwo = 10000;
const reliefLevelPartTwo = 1;

const monkeysToChase = 2;

// --- Part One ---
const findMostInspectingMonkeys = (input, rounds, reliefLevel) => {
    const monkeysStrings = input.split("\n\n").map(line => line.split("\n"));
    const monkeys = monkeysStrings.map(monkey => {
        const monkeyIfTrue = +monkey[4].trim().split(" ")[5];
        const monkeyIfFalse = +monkey[5].trim().split(" ")[5];
        const testDivider = +monkey[3].trim().split(" ")[3];
        return {
            items: monkey[1].split(":")[1].split(",").map(value => +value.trim()),
            operation: old => {
                const expression = monkey[2].split(" = ")[1].split(" ");
                const additionalValue = expression[2] === "old" ? old : +expression[2];
                const func = expression[1] === "+" ? (a, b) => a + b : (a, b) => a * b;
                return func(old, additionalValue);
            },
            testDivider: testDivider,
            nextMonkey: worryLevel => worryLevel % testDivider === 0 ? monkeyIfTrue : monkeyIfFalse,
            inspects: 0,
        }
    });

    // we can safely decrease worryLevel with division with remainder by multiplication of all test dividers,
    // in this case modulo (remainder) safes all properties, but will get no so big number, because in part two task
    // it gets too huge for handling
    const worryLevelDecreaseFactor = monkeys.map(monkey => monkey.testDivider).reduce((res, val) => res * val, 1)

    for (let i = 0; i < rounds; i++) {
        monkeys.forEach(monkey => {
            monkey.items.forEach(item => {
                monkey.inspects++;
                let worryLevel = Math.floor(monkey.operation(item) / reliefLevel) % worryLevelDecreaseFactor;
                monkeys[monkey.nextMonkey(worryLevel)].items.push(worryLevel);
            });
            monkey.items = [];
        })
    }

    const inspections = monkeys.map(monkey => monkey.inspects).sort((a, b) => b - a).slice(0, monkeysToChase);

    return inspections.reduce((result, value) => result * value, 1);
};

console.log("Part One - simple test: ", findMostInspectingMonkeys(simpleInput, roundsPartOne, reliefLevelPartOne) === simpleAnswerPartOne);
console.log("Part One - real test: ", findMostInspectingMonkeys(input, roundsPartOne, reliefLevelPartOne) === answerPartOne);

// --- Part Two ---
console.log("Part Two - simple test: ", findMostInspectingMonkeys(simpleInput, roundsPartTwo, reliefLevelPartTwo) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", findMostInspectingMonkeys(input, roundsPartTwo, reliefLevelPartTwo) === answerPartTwo);
