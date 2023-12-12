const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const simpleAnswerPartOne = 8;
const simpleAnswerPartTwo = 2286;

const maxCubesValues = { red: 12, green: 13, blue: 14 }

const isGamePossible = gameArray => gameArray.every(game =>
    game.every(result => {
        const [value, color] = result.split(" ");
        return value <= maxCubesValues[color];
    })
)

// --- Part One ---
const countPossibleGames = input => input
    .split("\n")
    .map(gameString => gameString.split(/Game \d+: /)[1])
    .map(gameString => gameString.split("; "))
    .map(gamesArray => gamesArray.map(game => game.split(", ")))
    .map(gamesArray => isGamePossible(gamesArray))
    .reduce((result, game, i) => game ? result + i + 1 : result, 0);

console.log("Part One - simple test: ", countPossibleGames(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", countPossibleGames(input) === answerPartOne);

// --- Part Two ---
const getCubesSetPower = gameArray => {
    const maxCubesValues = { red: 0, green: 0, blue: 0 };
    gameArray.forEach(game =>
        game.forEach(result => {
            const [value, color] = result.split(" ");
            if (+value > maxCubesValues[color]) {
                maxCubesValues[color] = +value;
            }
        })
    )

    return Object.values(maxCubesValues).reduce((power, value) => power * value, 1);
}

const getSumOfPowerOfCubesSet = input => input
    .split("\n")
    .map(gameString => gameString.split(/Game \d+: /)[1])
    .map(gameString => gameString.split("; "))
    .map(gamesArray => gamesArray.map(game => game.split(", ")))
    .map(gamesArray => getCubesSetPower(gamesArray))
    .reduce((result, power) => result + power, 0);

console.log("Part Two - simple test: ", getSumOfPowerOfCubesSet(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", getSumOfPowerOfCubesSet(input) === answerPartTwo);
