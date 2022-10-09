const inputEl = document.getElementById("input-field");
const numbersToTypeEl = document.getElementById("numbers-to-type");

let randomNumbersString = "";
const NUMBERS_IN_ONE_LINE = 5;

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
  randomNumbersString = randomNumbers.join("").toString();
};

const refreshNumbersInNumbersToType = (numbers) => {
  numbersToTypeEl.textContent = randomNumbersString;
};
refreshNumbersInNumbersToType(generateRandomNumbers(NUMBERS_IN_ONE_LINE));

const lineIsFinished = () => {
  return randomNumbersString === inputEl.value ? true : false;
};

inputEl.addEventListener("keyup", () => {
  if (inputEl.value !== "" && lineIsFinished()) {
    refreshNumbersInNumbersToType(generateRandomNumbers(NUMBERS_IN_ONE_LINE));
    inputEl.value = "";
  }
});
