const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `30373
25512
65332
33549
35390`;

const simpleAnswerPartOne = 21;
const simpleAnswerPartTwo = 8;

// --- Part One ---
const countVisibleTrees = input => {
    const trees = input.split("\n").map(line => line.split("").map(Number));
    let visibleTrees = 0;

    trees.forEach((line, i) => line.forEach((currentTree, j) => {
        if (i === 0 || j === 0 || i === trees.length - 1 || j === line.length - 1) { // check field edges
            visibleTrees++;
        } else {
            if (line.slice(0, j).every(tree => tree < currentTree)) { // check left trees
                visibleTrees++;
            } else if (line.slice(j + 1, line.length).every(tree => tree < currentTree)) { // check right trees
                visibleTrees++;
            } else if (trees.map(l => l[j]).slice(0, i).every(tree => tree < currentTree)) { // check top trees
                visibleTrees++;
            } else if (trees.map(l => l[j]).slice(i + 1, trees.length).every(tree => tree < currentTree)) { // check top trees
                visibleTrees++;
            }
        }
    }))

    return visibleTrees;
};

console.log("Part One - simple test: ", countVisibleTrees(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", countVisibleTrees(input) === answerPartOne);

// --- Part Two ---
const findHighestScenicScore = input => {
    const trees = input.split("\n").map(line => line.split("").map(Number));
    let maxScore = 0;

    trees.forEach((line, i) => line.forEach((currentTree, j) => {
        let leftTrees = line.slice(0, j).reverse().findIndex(tree => tree >= currentTree);
        leftTrees === -1 ? leftTrees = line.slice(0, j).length : leftTrees++;

        let rightTrees = line.slice(j + 1, line.length).findIndex(tree => tree >= currentTree);
        rightTrees === -1 ? rightTrees = line.slice(j + 1, line.length).length : rightTrees++;

        let topTrees = trees.map(l => l[j]).slice(0, i).reverse().findIndex(tree => tree >= currentTree);
        topTrees === -1 ? topTrees = trees.map(l => l[j]).slice(0, i).length : topTrees++;

        let bottomTrees = trees.map(l => l[j]).slice(i + 1, trees.length).findIndex(tree => tree >= currentTree);
        bottomTrees === -1 ? bottomTrees = trees.map(l => l[j]).slice(i + 1, trees.length).length : bottomTrees++;

        const currentScore = leftTrees * rightTrees * topTrees * bottomTrees;
        if (currentScore > maxScore) {
            maxScore = currentScore;
        }
    }))

    return maxScore;
}

console.log("Part Two - simple test: ", findHighestScenicScore(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", findHighestScenicScore(input) === answerPartTwo);
