"use strict";

const wordEl = document.querySelector(".js-word");
const wrongLettersEl = document.querySelector(".js-wrong-letters");
const playAgainBtn = document.querySelector(".js-play-button");
const popup = document.querySelector(".js-popup-container");
const notification = document.querySelector("js-notification-container");
const finalMessage = document.querySelector("js-final-message");
const figureParts = document.querySelectorAll(".figure-part");

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
  "responsive design",
  "accessibility",
  "asynchronous",
  "arrow function",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);
const correctLetters = ["a", "p", "r", "i", "o"];
const wrongLetters = [];

//Show hidden word
function displayWord() {
  //Take the selected word, turn it into an array in order to map throught it and return either a letter or a blank just an empty string
  wordEl.innerHTML = `${selectedWord
    //Turn a string into an array
    .split("")
    //Through the array and for each letter we're gonna a return a span element with a class define earlier, and we check if the current letter we're looping throught is included in correctLetters' array and then show the letter
    .map(
      (letter) =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</span>`
    )
    //To complete this, we need to turn it back into a string
    .join("")}`;
  showPopup();
}

function showPopup() {
  //Remove the new line character after each letter
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  console.log(innerWord);
  //If you win, show the popup
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😄";
    popup.style.display = "flex";
  }
}

displayWord();
