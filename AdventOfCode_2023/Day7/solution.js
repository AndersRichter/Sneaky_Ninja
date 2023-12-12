const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const simpleAnswerPartOne = 6440;
const simpleAnswerPartTwo = 5905;

// "T55J5" => { T: 1, 5: 3, J: 1 }
const countSymbolsInHand = hand => {
    const result = {};

    for (let i = 0; i < hand.length; i++) {
        const symbol = hand[i];
        if (result[symbol]) {
            result[symbol]++;
        } else {
            result[symbol] = 1;
        }
    }

    return result;
}

// { A: 5 } => true
// { A: 3, K: 2 } => false
const isFiveOfAKind = symbolsStructure => Object.keys(symbolsStructure).length === 1;

// { A: 4, K: 1 } => true
// { A: 3, K: 2 } => false
const isFourOfAKind = symbolsStructure => Object.keys(symbolsStructure).length === 2 && Object.values(symbolsStructure).includes(4);

// { A: 3, K: 2 } => true
// { A: 4, K: 1 } => false
const isFullHouse = symbolsStructure => Object.keys(symbolsStructure).length === 2 && Object.values(symbolsStructure).includes(3);

// { A: 3, K: 1, Q: 1 } => true
// { A: 2, K: 2, Q: 1 } => false
const isThreeOfAKind = symbolsStructure => Object.keys(symbolsStructure).length === 3 && Object.values(symbolsStructure).includes(3);

// { A: 2, K: 2, Q: 1 } => true
// { A: 1, K: 3, Q: 1 } => false
const isTwoPairs = symbolsStructure => Object.keys(symbolsStructure).length === 3 && Object.values(symbolsStructure).includes(2);

// { A: 2, K: 1, Q: 1, J: 1 } => true
// { A: 1, K: 3, Q: 1 } => false
const isOnePair = symbolsStructure => Object.keys(symbolsStructure).length === 4;

// { A: 1, K: 1, Q: 1, J: 1, T: 1 } => true
// { A: 1, K: 2, Q: 1, J: 1 } => false
const isHighCard = symbolsStructure => Object.keys(symbolsStructure).length === 5;

const cardsList = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

const getHandStrengthByType = symbolsStructure => {
    if (isFiveOfAKind(symbolsStructure)) return 7;
    if (isFourOfAKind(symbolsStructure)) return 6;
    if (isFullHouse(symbolsStructure)) return 5;
    if (isThreeOfAKind(symbolsStructure)) return 4;
    if (isTwoPairs(symbolsStructure)) return 3;
    if (isOnePair(symbolsStructure)) return 2;
    if (isHighCard(symbolsStructure)) return 1;

    return 0;
}

const compareHands = ([handA], [handB]) => {
    const strengthA = getHandStrengthByType(countSymbolsInHand(handA));
    const strengthB = getHandStrengthByType(countSymbolsInHand(handB));

    if (strengthA !== strengthB) {
        return strengthA - strengthB;
    }

    for (let i = 0; i < handA.length; i++) {
        const powerOfSymbolA = cardsList.findIndex(value => value === handA[i]);
        const powerOfSymbolB = cardsList.findIndex(value => value === handB[i]);

        if (powerOfSymbolA !== powerOfSymbolB) {
            return powerOfSymbolB - powerOfSymbolA; // less - better
        }
    }

    return 0;
}

// --- Part One ---
const calculateTotalWinningsOfCamelCards = input => input
    .split("\n")
    .map(line => line.split(" "))
    .map(line => ([line[0], +line[1]]))
    .sort(compareHands)
    .reduce((sum, [, bid], i) => sum + bid * (i + 1), 0);

console.log("Part One - simple test: ", calculateTotalWinningsOfCamelCards(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", calculateTotalWinningsOfCamelCards(input) === answerPartOne);

// --- Part Two ---
const cardsListJokers = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

const increaseHandStrengthByJokers = symbolsStructure => {
    if (Object.keys(symbolsStructure).includes("J")) {
        const jokersCount = symbolsStructure.J;
        delete symbolsStructure.J;
        const maxCountOfOtherCards = Math.max(...Object.values(symbolsStructure));
        const cardWithMaxCount = Object.keys(symbolsStructure).find(key => symbolsStructure[key] === maxCountOfOtherCards);
        symbolsStructure[cardWithMaxCount] += jokersCount;
        return symbolsStructure;
    }

    return symbolsStructure;
}

const compareHandsJokers = ([handA], [handB]) => {
    const strengthA = getHandStrengthByType(increaseHandStrengthByJokers(countSymbolsInHand(handA)));
    const strengthB = getHandStrengthByType(increaseHandStrengthByJokers(countSymbolsInHand(handB)));

    if (strengthA !== strengthB) {
        return strengthA - strengthB;
    }

    for (let i = 0; i < handA.length; i++) {
        const powerOfSymbolA = cardsListJokers.findIndex(value => value === handA[i]);
        const powerOfSymbolB = cardsListJokers.findIndex(value => value === handB[i]);

        if (powerOfSymbolA !== powerOfSymbolB) {
            return powerOfSymbolB - powerOfSymbolA; // less - better
        }
    }

    return 0;
}

const calculateTotalWinningsOfCamelCardsWithJokers = input => input
    .split("\n")
    .map(line => line.split(" "))
    .map(line => ([line[0], +line[1]]))
    .sort(compareHandsJokers)
    .reduce((sum, [, bid], i) => sum + bid * (i + 1), 0);

console.log("Part Two - simple test: ", calculateTotalWinningsOfCamelCardsWithJokers(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", calculateTotalWinningsOfCamelCardsWithJokers(input) === answerPartTwo);
