const generateRandomNumberBetween0and9 = () => {
  return Math.floor(Math.random() * 10);
};

export const generateRandomNumbers = (numberOfRandomNumbersToGenerate) => {
  const randomNumbers = [];
  let prevNumber = 0;
  let newNumber = prevNumber;
  for (let i = 0; i < numberOfRandomNumbersToGenerate; i++) {
    while (prevNumber === newNumber) {
      newNumber = generateRandomNumberBetween0and9();
    }
    prevNumber = newNumber;
    randomNumbers.push(newNumber);
  }
  return randomNumbers.join("").toString();
};
