const NUMBERS_IN_ONE_LINE = 1;

const inputEl = document.getElementById("input-field");
const numbersToTypeEl = document.getElementById("numbers-to-type");

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

inputEl.addEventListener("keyup", () => {
  if (inputEl.value !== "" && lineIsFinished()) {
    refreshNumbersInNumbersToType(generateRandomNumbers(NUMBERS_IN_ONE_LINE));
    inputEl.value = "";
    return;
  }

  validUntilNow(randomNumbersString, inputEl.value)
    ? inputEl.classList.remove("invalid")
    : inputEl.classList.add("invalid");
});
