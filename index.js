const NUMBERS_IN_ONE_LINE = 1;
let numbersTyped = 0;
let missedNumbers = 0;

const inputEl = document.getElementById("input-field");
const numbersToTypeEl = document.getElementById("numbers-to-type");
const accuracyFieldEl = document.getElementById("accuracy-field");
const numbersTypedEl = document.getElementById("numbers-typed");
const missedNumbersEl = document.getElementById("missed-numbers");

let randomNumbersString = "";

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 10);
};

const generateRandomNumbers = (numberOfRandomNumbersToGenerate) => {
  const randomNumbers = [];
  let prevNumber = 0;
  let newNumber = prevNumber;
  for (let i = 0; i < numberOfRandomNumbersToGenerate; i++) {
    while (prevNumber === newNumber) {
      newNumber = generateRandomNumber();
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

const validUntilNow = (randomNumbersString, actuallyTypedNumbers) => {
  let valid = true;
  for (let i = 0; i < actuallyTypedNumbers.length; i++) {
    if (randomNumbersString.charAt(i) !== actuallyTypedNumbers.charAt(i)) {
      valid = false;
      break;
    }
  }
  return valid;
};

const updateAccuracyFields = () => {
  numbersTypedEl.innerText = numbersTyped;
  missedNumbersEl.innerText = missedNumbers;
};

inputEl.addEventListener("keyup", () => {
  if (validUntilNow(randomNumbersString, inputEl.value)) {
    inputEl.classList.remove("invalid");
  } else {
    inputEl.classList.add("invalid");
    missedNumbers++;
  }

  if (inputEl.value !== "" && lineIsFinished()) {
    refreshNumbersInNumbersToType(generateRandomNumbers(NUMBERS_IN_ONE_LINE));
    inputEl.value = "";
    numbersTyped++;
  }

  updateAccuracyFields();
});
