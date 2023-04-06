const x = "qwertyuiopasdfghjklzxcvbnm";
const immutableArray = x.split("");
const jsDisplay = document.querySelector(".jsDisplay");

function randLength() {
  let rrLength = Math.round(Math.random() * 10);
  let rLength = 10 ** rrLength;
  let length = Math.round(Math.random() * rLength);
  return length;
}

let randomLength = randLength();
let length = randomLength.toString().length;
console.log(length);

function populateJSDisplay() {
  for (let index = 0; index < length; index++) {
    const randIndex = Math.floor(Math.random() * (immutableArray.length - 1));
    jsDisplay.textContent += immutableArray[randIndex];
  }
}

function populatePlayerBoard() {
  for (let index = immutableArray.length - 1; index > 0; index--) {
    const j = Math.floor(Math.random() * (index + 1));
    [immutableArray[index], immutableArray[j]] = [
      immutableArray[j],
      immutableArray[index],
    ];
  }
  const emptyButtons = document.querySelectorAll(".button");
  let i = 0;
  for (const eachButton of emptyButtons) {
    if (i < immutableArray.length) {
      eachButton.textContent = immutableArray[i];
      i++;
    }
  }
}

window.addEventListener("load", populateJSDisplay(), populatePlayerBoard());

let userDisplay = document.querySelector(".userDisplay");
const userInputBoard = document.querySelector(".userInputBoard");

userInputBoard.addEventListener("click", function (event) {
  let selectedNumber = event.target.textContent;
  // ================================================================================================================
  // ran into an interesting bug. due to "else {userDisplay.textContent += selectedNumber;}",
  // if I clicked on the userInputBoard, all the display elements within userInputBoard will enter into userDisplay.
  // Added className != "button" as safety net.
  //=================================================================================================================
  if (event.target.className != "button") {
    return;
  }
  if (selectedNumber === "Enter" || selectedNumber === "C") {
    if (selectedNumber === "Enter") {
      if (userDisplay.textContent === jsDisplay.textContent) {
        counter++;
        winCounter.textContent = `Wins: ${counter}`;
        populateJSDisplay();
        populatePlayerBoard();
        userDisplay.textContent = "";
      } else {
        gameLost();
      }
    }
    if (selectedNumber === "C") {
      userDisplay.textContent = userDisplay.textContent.slice(0, -1);
    }
  } else {
    userDisplay.textContent += selectedNumber;
  }
});

window.addEventListener("click", function (event) {
  console.log(event.target.textContent);
});

const allDivs = document.querySelectorAll("div");
const loseStateContainer = document.querySelector(".container");
const loseState = document.querySelector(".gameLost");
const tryAgain = document.querySelector(".tryAgain");
const back = document.querySelector(".back");

function gameLost() {
  for (const eachDiv of allDivs) {
    eachDiv.remove();
  }
  winCounter.style = "display: none";
  loseStateContainer.style = "display: flex";
  loseState.textContent = `Game Over! Score: ${counter}`;
}

tryAgain.addEventListener("click", function (event) {
  location.reload();
});

back.addEventListener("click", function () {
  window.location.href = "../index.html";
});

let winCounter = document.querySelector(".winCounter");
let counter = 0;
