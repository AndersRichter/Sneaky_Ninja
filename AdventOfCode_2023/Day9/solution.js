const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const simpleAnswerPartOne = 114;
const simpleAnswerPartTwo = 2;

/*
  input => [ [ 1, 3, 6, 10, 15, 21 ] ]
  output => [
    [ 1, 3, 6, 10, 15, 21 ],
    [ 2, 3, 4, 5, 6 ],
    [ 1, 1, 1, 1 ],
    [ 0, 0, 0 ]
  ]
*/
const fillListOfDifferences = numbersList => {
    const currentList = numbersList[numbersList.length - 1];

    if (currentList.every(number => number === 0)) {
        return numbersList;
    }

    const newNumbersList = [];

    for (let i = 0; i < currentList.length - 1; i++) {
        newNumbersList.push(currentList[i + 1] - currentList[i]);
    }

    numbersList.push(newNumbersList);
    return fillListOfDifferences(numbersList);
}

/*
  input => [
    [ 1, 3, 6, 10, 15, 21 ],
    [ 2, 3, 4, 5, 6 ],
    [ 1, 1, 1, 1 ],
    [ 0, 0, 0 ]
  ]
  output => 28
*/
const predictNextValueFromListOfDifferences = (nextValue, index, listOfDifferences) => {
    if (index < 0) {
        return nextValue;
    }

    const newNextValue = listOfDifferences[index][listOfDifferences[index].length - 1] + nextValue;

    return predictNextValueFromListOfDifferences(newNextValue, --index, listOfDifferences);
}

// --- Part One ---
const findExtrapolatedValuesInTheEnd = input => input
    .split("\n")
    .map(line => line.split(" ").map(number => +number))
    .reduce((sum, numbersLine) => {
        const listOfDifferences = fillListOfDifferences([numbersLine]);
        sum += predictNextValueFromListOfDifferences(0, listOfDifferences.length - 1, listOfDifferences);
        return sum;
    }, 0);

console.log("Part One - simple test: ", findExtrapolatedValuesInTheEnd(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", findExtrapolatedValuesInTheEnd(input) === answerPartOne);

// --- Part Two ---
/*
  input => [
    [ 10, 13, 16, 21, 30, 45 ],
    [ 3, 3, 5, 9, 15 ],
    [ 0, 2, 4, 6 ],
    [ 2, 2, 2 ],
    [ 0, 0 ]
  ]
  output => 5
*/
const predictPrevValueFromListOfDifferences = (prevValue, index, listOfDifferences) => {
    if (index < 0) {
        return prevValue;
    }

    const newPrevValue = listOfDifferences[index][0] - prevValue;

    return predictPrevValueFromListOfDifferences(newPrevValue, --index, listOfDifferences);
}

const findExtrapolatedValuesInTheBeginning = input => input
    .split("\n")
    .map(line => line.split(" ").map(number => +number))
    .reduce((sum, numbersLine) => {
        const listOfDifferences = fillListOfDifferences([numbersLine]);
        sum += predictPrevValueFromListOfDifferences(0, listOfDifferences.length - 1, listOfDifferences);
        return sum;
    }, 0);

console.log("Part Two - simple test: ", findExtrapolatedValuesInTheBeginning(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", findExtrapolatedValuesInTheBeginning(input) === answerPartTwo);
