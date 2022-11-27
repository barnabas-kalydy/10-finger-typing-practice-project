import { generateRandomNumbers } from "./src/random_generator.js";
import { NUMBERS_IN_ONE_LINE } from "./config.js";

const inputEl = document.getElementById("input-field");
const numbersToTypeEl = document.getElementById("numbers-to-type");
const accuracyFieldEl = document.getElementById("accuracy-field");
const numbersTypedEl = document.getElementById("numbers-typed");
const missedNumbersEl = document.getElementById("missed-numbers");
const timerFieldEl = document.getElementById("timer-field");
const charPerMinField = document.getElementById("char-per-min-field");
const showInfoEl = document.getElementById("show-info");
const additionalInfoEl = document.getElementById("additional-info");

let missedNumbers = 0;
let numbersTyped = 0;
let randomNumbersString = "";
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_SECOND = 1000;

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

const calculateAccuratelyTypedNumbers = () => {
  return numbersTyped - missedNumbers;
};

const updateAccuracyFields = () => {
  numbersTypedEl.innerText = numbersTyped;
  missedNumbersEl.innerText = missedNumbers;
  accuracyFieldEl.innerText =
    ((calculateAccuratelyTypedNumbers() / numbersTyped) * 100).toFixed(2) +
    " %";
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

showInfoEl.addEventListener("change", (e) => {
  e.target.checked
    ? (additionalInfoEl.style.display = "inline")
    : (additionalInfoEl.style.display = "none");
});

const startDate = new Date();
const updateTimer = () => {
  const actualDate = new Date();
  const timerSeconds = (
    (actualDate.valueOf() - startDate.valueOf()) /
    MILLISECONDS_PER_SECOND
  ).toFixed(0);
  const minutes = Math.floor(timerSeconds / SECONDS_PER_MINUTE);
  const seconds = timerSeconds % SECONDS_PER_MINUTE;
  timerFieldEl.textContent =
    (minutes.toString().length > 1 ? minutes : "0" + minutes) +
    " : " +
    (seconds.toString().length > 1 ? seconds : "0" + seconds);
<<<<<<< HEAD
  charPerMinField.textContent = (
    calculateAccuratelyTypedNumbers() /
    (timerSeconds / 60)
  ).toFixed(2);
=======
  // todo this is now calculating numbers / seconds -> this is a bug
  charPerMinField.textContent = (numbersTyped / timerSeconds).toFixed(2);
>>>>>>> 6ece206bd8f725c702d883f184fb4c640ea48ead
};

const myInterval = setInterval(updateTimer, MILLISECONDS_PER_SECOND);
