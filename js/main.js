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
const correctLetters = [];
const wrongLetters = [];
