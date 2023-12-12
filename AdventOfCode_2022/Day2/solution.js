const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `A Y
B X
C Z`;

const simpleAnswerPartOne = 15;
const simpleAnswerPartTwo = 12;

const rock = "Rock";
const paper = "Paper";
const scissors = "Scissors";

const win = "Win";
const lose = "Lose";
const draw = "Draw";

const figureBySymbol = {
    A: rock,
    B: paper,
    C: scissors,
    X: rock,
    Y: paper,
    Z: scissors,
}

const scoreByFigure = {
    [rock]: 1,
    [paper]: 2,
    [scissors]: 3,
}

const scoreByGameResult = {
    [lose]: 0,
    [draw]: 3,
    [win]: 6,
}

const gameResultsMatrix = {
    [rock]: { [rock]: draw, [paper]: lose, [scissors]: win },
    [paper]: { [rock]: win, [paper]: draw, [scissors]: lose},
    [scissors]: { [rock]: lose, [paper]: win, [scissors]: draw},
}

const gameResultBySymbol = {
    X: lose,
    Y: draw,
    Z: win,
}

// --- Part One ---
const getTotalScoreOfRockPaperScissors = input => input
    .split("\n")
    .reduce((sum, value) => {
        const opponentFigure = figureBySymbol[value.split(" ")[0]];
        const yourFigure = figureBySymbol[value.split(" ")[1]];
        return sum + scoreByFigure[yourFigure] + scoreByGameResult[gameResultsMatrix[yourFigure][opponentFigure]];
    }, 0);

console.log("Part One - simple test: ", getTotalScoreOfRockPaperScissors(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", getTotalScoreOfRockPaperScissors(input) === answerPartOne);

// --- Part Two ---
const getTotalScoreOfRPSAccordingToStrategyGuide = input => input
    .split("\n")
    .reduce((sum, value) => {
        const opponentFigure = figureBySymbol[value.split(" ")[0]];
        const gameResult = gameResultBySymbol[value.split(" ")[1]];
        const yourFigure = Object.keys(gameResultsMatrix).find(
            figure => gameResultsMatrix[figure][opponentFigure] === gameResult
        );
        return sum + scoreByFigure[yourFigure] + scoreByGameResult[gameResult];
    }, 0);

console.log("Part Two - simple test: ", getTotalScoreOfRPSAccordingToStrategyGuide(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", getTotalScoreOfRPSAccordingToStrategyGuide(input) === answerPartTwo);