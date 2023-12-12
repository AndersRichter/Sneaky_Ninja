const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const simpleAnswerPartOne = 35;
const simpleAnswerPartTwo = 46;

// --- Part One ---
const findLowestLocation = input => {
    const formattedInput = input.split("\n\n");
    const seeds = formattedInput[0]
        .split(": ")[1]
        .split(" ")
        .map(number => +number);
    const maps = formattedInput
        .slice(1, formattedInput.length)
        .map(group => group.split("\n"))
        .map(group => group
            .slice(1, group.length)
            .map(line => line
                .split(" ")
                .map(number => +number)
            )
        );

    let minLocation = Number.MAX_VALUE;

    seeds.forEach(seed => {
        let currentSeed = seed;

        maps.forEach(map => {
            for (let i = 0; i < map.length; i++) {
                const mapLine = map[i];
                const maxRangeValue = mapLine[1] + mapLine[2] - 1;

                if (currentSeed >= mapLine[1] && currentSeed <= maxRangeValue) {
                    const delta = currentSeed - mapLine[1];
                    currentSeed = mapLine[0] + delta;
                    break;
                }
            }
        })

        if (currentSeed < minLocation) {
            minLocation = currentSeed;
        }
    })

    return minLocation;
}

console.log("Part One - simple test: ", findLowestLocation(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", findLowestLocation(input) === answerPartOne);

// --- Part Two ---
const findLowestLocationIfSeedsAreInRange = input => {
    const formattedInput = input.split("\n\n");
    const seeds = formattedInput[0]
        .split(": ")[1]
        .split(" ")
        .map(number => +number)
        .map((number, i, array) => {
            if (i % 2 === 0) {
                return [number, array[i+1]]
            }

            return null;
        })
        .filter(value => !!value);

    const maps = formattedInput
        .slice(1, formattedInput.length)
        .map(group => group.split("\n"))
        .map(group => group
            .slice(1, group.length)
            .map(line => line
                .split(" ")
                .map(number => +number)
            )
        );

    let minLocation = Number.MAX_VALUE;

    seeds.forEach((seed, k) => {
        console.log("seed", seed, "k", k);
        for (let j = 0; j < seed[1]; j++) {
            let currentSeed = seed[0] + j;

            maps.forEach(map => {
                for (let i = 0; i < map.length; i++) {
                    const mapLine = map[i];
                    const maxRangeValue = mapLine[1] + mapLine[2] - 1;

                    if (currentSeed >= mapLine[1] && currentSeed <= maxRangeValue) {
                        const delta = currentSeed - mapLine[1];
                        currentSeed = mapLine[0] + delta;
                        break;
                    }
                }
            })

            if (currentSeed < minLocation) {
                minLocation = currentSeed;
            }
        }
    })

    return minLocation;
}

console.log("Part Two - simple test: ", findLowestLocationIfSeedsAreInRange(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", findLowestLocationIfSeedsAreInRange(input) === answerPartTwo);
