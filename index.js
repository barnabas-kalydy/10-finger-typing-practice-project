const inputEl = document.getElementById("input-field");
const numbersToTypeEl = document.getElementById("numbers-to-type");

const generateRandomNumbers = (numberOfRandomNumbersToGenerate) => {
  const randomNumbers = [];
  for (let i = 0; i < numberOfRandomNumbersToGenerate; i++) {
    randomNumbers.push(Math.abs((Math.random() * 10 - 1).toFixed(0)));
  }
  return randomNumbers;
};

const refreshNumbersInNumbersToType = (numbers) => {
  numbersToTypeEl.textContent = numbers.join("").toString();
};
refreshNumbersInNumbersToType(generateRandomNumbers(25));
