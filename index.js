const inputEl = document.getElementById("input-field");
const numbersToTypeEl = document.getElementById("numbers-to-type");

const generateRandomNumbers = (numberOfRandomNumbersToGenerate) => {
  const randomNumbers = [];
  let prevNumber = 0;
  let newNumber = 1;
  for (let i = 0; i < numberOfRandomNumbersToGenerate; i++) {
    while (prevNumber === newNumber) {
      newNumber = Math.abs((Math.random() * 10 - 1).toFixed(0));
    }
    prevNumber = newNumber;
    randomNumbers.push(newNumber);
  }
  return randomNumbers;
};

const refreshNumbersInNumbersToType = (numbers) => {
  numbersToTypeEl.textContent = numbers.join("").toString();
};
refreshNumbersInNumbersToType(generateRandomNumbers(25));
