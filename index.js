import { generateRandomNumbers } from "./src/random_generator.js";
import { NUMBERS_IN_ONE_LINE } from "./config.js";

const inputEl = document.getElementById("input-field");
const numbersToTypeEl = document.getElementById("numbers-to-type");
const accuracyFieldEl = document.getElementById("accuracy-field");
const numbersTypedEl = document.getElementById("numbers-typed");
const missedNumbersEl = document.getElementById("missed-numbers");
const timerFieldEl = document.getElementById("timer-field");
const charPerMinField = document.getElementById("char-per-min-field");

let missedNumbers = 0;
let numbersTyped = 0;
let randomNumbersString = "";

const refreshNumbersInNumbersToType = () => {
  randomNumbersString = generateRandomNumbers(NUMBERS_IN_ONE_LINE);
  numbersToTypeEl.textContent = randomNumbersString;
};
refreshNumbersInNumbersToType();

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
  accuracyFieldEl.innerText =
    (((numbersTyped - missedNumbers) / numbersTyped) * 100).toFixed(2) + " %";
};

inputEl.addEventListener("keyup", (e) => {
  if (e.key === "Backspace") {
    return;
  }

  if (validUntilNow(randomNumbersString, inputEl.value)) {
    inputEl.classList.remove("invalid");
  } else {
    inputEl.classList.add("invalid");
    missedNumbers++;
  }

  const isInputNotEmpty = inputEl.value !== "";
  const isLineFinished = randomNumbersString === inputEl.value ? true : false;
  if (isInputNotEmpty && isLineFinished) {
    refreshNumbersInNumbersToType();
    inputEl.value = "";
  }

  numbersTyped++;
  updateAccuracyFields();
});

let time = 0;
const updateTimer = () => {
  time++;
  timerFieldEl.textContent = time;
  charPerMinField.textContent = (numbersTyped / (time / 60)).toFixed(2);
};

const myInterval = setInterval(updateTimer, 1000);
