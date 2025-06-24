const GAMES = 1000;

const getRandomDoor = () => Math.floor((Math.random() * 3));
const getRandomDoorFrom2 = () => Math.floor((Math.random() * 2));

const testRandom = (randomFunc) => {
  const distribution = [0, 0, 0];

  for (let i = 0; i < GAMES; i++) {
    distribution[randomFunc()]++;
  }
  
  console.log("testRandom ->", distribution.filter(value => value));
}

testRandom(getRandomDoor);
testRandom(getRandomDoorFrom2);

const prepareDoors = () => {
  const doors = ["", "", ""];
  const doorNumberWithCar = getRandomDoor();
  doors[doorNumberWithCar] = "car";
  const playerFirstChoiceDoor = getRandomDoor();
  
  return { doors, doorNumberWithCar, playerFirstChoiceDoor };
}

const playGameWinLose = (doors, winsDistribution, playerChoice) => {
  if (doors[playerChoice] === "car") {
    winsDistribution.win++;
  } else {
    winsDistribution.lose++;
  };
}

const regularGame = () => {
  const winsDistribution = { win: 0, lose: 0 };
  
  for (let i = 0; i < GAMES; i++) {
    const { doors, doorNumberWithCar, playerFirstChoiceDoor } = prepareDoors();
    playGameWinLose(doors, winsDistribution, playerFirstChoiceDoor);
  }
  
  console.log("wins distribution in regular game ->", winsDistribution);
}

regularGame();

const gameWhenDealerOpensOneDoor = () => {
  const winsDistribution = { win: 0, lose: 0 };
  const doorNumbersToOpen = [0, 1, 2];
  
  for (let i = 0; i < GAMES; i++) {
    const { doors, doorNumberWithCar, playerFirstChoiceDoor } = prepareDoors();
    const validDoorsToOpenByDealer = doorNumbersToOpen.filter(door => door !== playerFirstChoiceDoor && door !== doorNumberWithCar);
    
    if (validDoorsToOpenByDealer.length === 0 || validDoorsToOpenByDealer.length === 3) {
      throw new Error("Invalid number of doors: impossible to open by dealer");
    }
    
    const doorOpenedByDealer = validDoorsToOpenByDealer.length === 1 ? validDoorsToOpenByDealer[0] : validDoorsToOpenByDealer[getRandomDoorFrom2()];
    
    if (typeof doorOpenedByDealer !== "number" || doorOpenedByDealer === doorNumberWithCar || doorOpenedByDealer === playerFirstChoiceDoor) {
      throw new Error("Dealer opened wrong door");
    }
    
    const newPlayerChoiceDoor = doorNumbersToOpen.filter(door => door !== playerFirstChoiceDoor && door !== doorOpenedByDealer)[0];
    
    if (typeof newPlayerChoiceDoor !== "number" || newPlayerChoiceDoor === playerFirstChoiceDoor || newPlayerChoiceDoor === doorOpenedByDealer) {
      throw new Error("Player opened wrong door");
    }
    
    playGameWinLose(doors, winsDistribution, newPlayerChoiceDoor);
  }
  
  console.log("wins distribution in game when dealer opens one door ->", winsDistribution);
}

gameWhenDealerOpensOneDoor();
