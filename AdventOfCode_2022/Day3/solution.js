const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const simpleAnswerPartOne = 157;
const simpleAnswerPartTwo = 70;

const separatorForUpperAndLowerCase = 93;
const diffWithUnicodeLowerCase = 96;
const diffWithUnicodeUpperCase = 38;

// --- Part One ---
const findSumOfPrioritiesOfItemTypes = input => input
    .split("\n")
    .reduce((sum, itemsString) => {
        const firstCompartment = itemsString.slice(0, itemsString.length / 2);
        const secondCompartment = itemsString.slice(itemsString.length / 2, itemsString.length);
        const itemInBothCompartments = firstCompartment.split('').find(item => secondCompartment.indexOf(item) !== -1);
        const codeOfItem = itemInBothCompartments.codePointAt(0);

        return sum + (codeOfItem > separatorForUpperAndLowerCase ? codeOfItem - diffWithUnicodeLowerCase : codeOfItem - diffWithUnicodeUpperCase);
    }, 0);

console.log("Part One - simple test: ", findSumOfPrioritiesOfItemTypes(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", findSumOfPrioritiesOfItemTypes(input) === answerPartOne);

// --- Part Two ---
const sumAllBadgesOfEachThreeElfGroup = input => {
    const allRucksacks = input.split("\n");
    let sumOfAllBadges = 0;

    for (let i = 0; i < allRucksacks.length; i += 3) {
        const itemInGroup = allRucksacks[i].split('').find(
            item => allRucksacks[i + 1].indexOf(item) !== -1 && allRucksacks[i + 2].indexOf(item) !== -1,
        );
        const codeOfItem = itemInGroup.codePointAt(0);
        sumOfAllBadges += codeOfItem > separatorForUpperAndLowerCase ? codeOfItem - diffWithUnicodeLowerCase : codeOfItem - diffWithUnicodeUpperCase;
    }

    return sumOfAllBadges;
}

console.log("Part Two - simple test: ", sumAllBadgesOfEachThreeElfGroup(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", sumAllBadgesOfEachThreeElfGroup(input) === answerPartTwo);