"use strict";

const wordEl = document.querySelector(".js-word");
const wrongLettersEl = document.querySelector(".js-wrong-letters");
const playAgainBtn = document.querySelector(".js-play-button");
const popup = document.querySelector(".js-popup-container");
const notification = document.querySelector(".js-notification-container");
const finalMessage = document.querySelector(".js-final-message");
const finalMessageWord = document.querySelector(".js-final-message-word");
const figureParts = document.querySelectorAll(".figure-part");
const keyboard = document.querySelector(".keyboard");

const words = [
  "developer",
  "application",
  "programming",
  "interface",
  "javascript",
  "vue",
  "api",
  "attribute",
  "framework",
  "favicon",
  "react",
  "angular",
  "accessibility",
  "asynchronous",
];

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

//Random word
let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);
const correctLetters = [];
const wrongLetters = [];

//Show hidden word
function displayWord() {
  //Take the selected word, turn it into an array in order to map throught it and return either a letter or a blank just an empty string
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</span>`
    )
    .join("")}`;
  showPopup();
}

function showPopup() {
  //Remove the new line character after each letter
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  //If you win, show the popup
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😄";
    finalMessageWord.innerText = "";
    popup.style.display = "flex";
  }
}

//Update the wrong letters
function updateWrongLettersEl() {
  //Render wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong letters</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;
  //Render parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //Check if you lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. ☹️";
    finalMessageWord.innerText = `The correct word was: ${selectedWord}`;
    popup.style.display = "flex";
  }
}

//Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//Keydown letter press
function keydownPress(ev) {
  if (ev.keyCode >= 65 && ev.keyCode <= 90) {
    const letterPressed = ev.key;

    if (selectedWord.includes(letterPressed)) {
      if (!correctLetters.includes(letterPressed)) {
        correctLetters.push(letterPressed);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letterPressed)) {
        wrongLetters.push(letterPressed);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
}

//Reset game and play again
function resetGame() {
  //Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  //Get a random word
  selectedWord = words[Math.floor(Math.random() * words.length)];

  //Start the game
  displayWord();

  //Clean up the wrong letters and hide the figure
  updateWrongLettersEl();

  //Hide popup
  popup.style.display = "none";
}

//<-----TO PLAY ON TABLET OR MOBILE DEVICE----->

//Keyboard
const writeKeyboard = () => {
  alphabet.map((letterKeyboard) => {
    const span = document.createElement("span");
    span.classList.add("keyboard__letter");
    span.textContent = letterKeyboard;
    keyboard.appendChild(span);
  });
};

//Check the letter pressed
const checkLetter = (letterPressed) => {
  if (selectedWord.includes(letterPressed)) {
    if (!correctLetters.includes(letterPressed)) {
      correctLetters.push(letterPressed);
      displayWord();
    } else {
      showNotification();
    }
  } else {
    if (!wrongLetters.includes(letterPressed)) {
      wrongLetters.push(letterPressed);

      updateWrongLettersEl();
    } else {
      showNotification();
    }
  }
};

function handleKeyboard(ev) {
  if (ev.target.classList.contains("keyboard__letter")) {
    checkLetter(ev.target.innerHTML);
  }
}

//EVENTS
playAgainBtn.addEventListener("click", resetGame);
window.addEventListener("keydown", keydownPress);
keyboard.addEventListener("click", handleKeyboard);

displayWord();
writeKeyboard();
