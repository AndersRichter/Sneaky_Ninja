const { input } = require('./input');
const { answerPartOne, answerPartTwo } = require('./answer');

const simpleInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const simpleAnswerPartOne = 95437;
const simpleAnswerPartTwo = 24933642;

const maxDirectorySize = 100000;
const fileSystemSize = 70000000;
const updateSize = 30000000;

const createEmptyDirectory = (name, parent) => ({
    name: name,
    directories: [],
    parent: parent,
    size: 0,
});

const addFileSizeToAllParents = (currentDir, fileSize) => {
    let currentDirectory = currentDir;
    currentDirectory.size += fileSize;

    while (currentDirectory.parent) {
        currentDirectory = currentDirectory.parent;
        currentDirectory.size += fileSize;
    }
}

const findSumOfDirsBelowMax = directory => {
    let sum = 0;

    if (directory.size <= maxDirectorySize) {
        sum += directory.size;
    }

    directory.directories.forEach(dir => {
        sum += findSumOfDirsBelowMax(dir);
    })

    return sum;
}

const getAllDirsSizeListToDelete = (directory, listToDelete, sizeToFree) => {
    if (directory.size >= sizeToFree) {
        listToDelete.push(directory.size);
    }

    directory.directories.forEach(dir => {
        listToDelete = getAllDirsSizeListToDelete(dir, listToDelete, sizeToFree);
    })

    return listToDelete;
}

const buildDirectoriesTree = input => {
    const treeRoot = createEmptyDirectory("/", null);
    let currentDir = treeRoot;

    // Building files and directories tree
    input.split("\n").forEach(commandLine => {
        const command = commandLine.split(" ");

        if (command[0] === "$") { // command
            if (command[1] === "cd") {
                switch (command[2]) {
                    case "/":
                        currentDir = treeRoot;
                        break;
                    case "..":
                        currentDir = currentDir.parent;
                        break;
                    default: // directory name
                        currentDir = currentDir.directories.find(dir => dir.name === command[2]);
                }
            }
        } else if (command[0] === "dir") { // directory
            currentDir.directories.push(createEmptyDirectory(command[1], currentDir));
        } else { // file
            const fileSize = +command[0];
            addFileSizeToAllParents(currentDir, fileSize);
        }
    });

    return treeRoot;
}

// --- Part One ---
const findSumOfTheSizesOfDirectoriesBelowMaxSize = input => findSumOfDirsBelowMax(buildDirectoriesTree(input));

console.log("Part One - simple test: ", findSumOfTheSizesOfDirectoriesBelowMaxSize(simpleInput) === simpleAnswerPartOne);
console.log("Part One - real test: ", findSumOfTheSizesOfDirectoriesBelowMaxSize(input) === answerPartOne);

// --- Part Two ---
const findDirectorySizeToDelete = input => {
    const filesTree = buildDirectoriesTree(input);
    const freeSpace = fileSystemSize - filesTree.size;
    const sizeToFree = updateSize - freeSpace;

    return Math.min(...getAllDirsSizeListToDelete(filesTree, [], sizeToFree));
}

console.log("Part Two - simple test: ", findDirectorySizeToDelete(simpleInput) === simpleAnswerPartTwo);
console.log("Part Two - real test: ", findDirectorySizeToDelete(input) === answerPartTwo);
