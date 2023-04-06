const immutableArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "C", "Enter", "."]; //REMEMBER THE C IS CAPS.
let rO = document.querySelector(".randOperation");
let rN = document.querySelector(".randomNumber");

function populateJSDisplay() {
  const jsOutput = document.querySelector(".jsDisplay");
  const randomJSOutput = Math.floor(Math.random() * 100000000);
  jsOutput.textContent = randomJSOutput;
  if (jsOutput.textContent.length < 8) {
    populateJSDisplay();
  }
}

function populateRandomNumber() {
  const rNGen = Math.floor(Math.random() * 1000);
  rN.textContent = rNGen;
}

function populateRandomOperation() {
  if (Math.random() > 0.5) {
    rO.textContent = "+";
  } else {
    rO.textContent = "-";
  }
}

window.addEventListener(
  "load",
  populateJSDisplay(),
  populatePlayerBoard(),
  populateRandomNumber(),
  populateRandomOperation()
);

//=============================================================
//below is the code for random population of player input board
//=============================================================

function populatePlayerBoard() {
  for (let i = immutableArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [immutableArray[i], immutableArray[j]] = [
      immutableArray[j],
      immutableArray[i],
    ];
  }

  const emptyButtons = document.querySelectorAll(".button");
  let immutableIndex = 0;

  for (const eachButton of emptyButtons) {
    if (immutableIndex < immutableArray.length) {
      eachButton.textContent = immutableArray[immutableIndex];
      immutableIndex++;
    }
  }
}
//=============================================================

//=====================================================
//code for testing. to be removed.
//=====================================================
document.addEventListener("click", function (event) {
  console.log(event.target.textContent);
});
//=====================================================

//==============================================================
//now I need to input player's selected number into userDisplay
//==============================================================

let jsDisplay = document.querySelector(".jsDisplay");
let userDisplay = document.querySelector(".userDisplay");
const userInputBoard = document.querySelector(".userInputBoard");
let winCounter = document.querySelector(".winCounter");
let counter = 0;
const timerDisplay = document.querySelector(".timer");
// CHANGE TIMER HERE
let timer = 80;
// CHANGE TIMER HERE
timerDisplay.innerHTML = `Time: <br></br> ${timer}`;
//===============
//timer function
//===============
function countdown() {
  timer--;
  timerDisplay.innerHTML = `Time: <br></br> ${timer}`;
  if (timer === 0) {
    gameLost();
  }
}

function countdownTimer() {
  setInterval(countdown, 1000);
}

countdownTimer();
//===============

//============================
//Expected Answer / Cheat Code
//============================
let eAns = document.querySelector(".expectedAnswer");
function expectedAnswer() {
  if (rO.textContent === "+") {
    const parsedJSDisplay = parseInt(jsDisplay.textContent);
    const parsedRN = parseInt(rN.textContent);
    eAns.textContent = parsedJSDisplay - parsedRN;
  } else if (rO.textContent === "-") {
    const parsedJSDisplay = parseInt(jsDisplay.textContent);
    const parsedRN = parseInt(rN.textContent);
    eAns.textContent = parsedJSDisplay - parsedRN;
  }
}

expectedAnswer();
console.log(eAns.textContent);
//===========================
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
  if (
    selectedNumber === "." ||
    selectedNumber === "C" ||
    selectedNumber === "Enter"
  ) {
    if (selectedNumber === ".") {
      if (userDisplay.textContent.includes(".")) {
        return;
      } else {
        userDisplay.textContent += selectedNumber;
      }
    }
    if (selectedNumber === "C") {
      userDisplay.textContent = userDisplay.textContent.slice(0, -1);
      console.log(eAns.textContent);
    }
    if (selectedNumber === "Enter") {
      if (userDisplay.textContent === eAns.textContent) {
        counter++;
        winCounter.textContent = `Wins: ${counter}`;
        populateJSDisplay();
        populatePlayerBoard();
        userDisplay.textContent = "";
        clearInterval(countdownTimer);
        timer = 80;
        expectedAnswer();
      } else {
        gameLost();
      }
    }
  } else {
    userDisplay.textContent += selectedNumber;
  }
});

//what is a switch statement
//====================================================================
//Now I need to add a timer and what happens lose state is triggered.
//====================================================================
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

//==========================================================================================================================================================
//I need to make sure the timer resets on each win. can I have the timer reset on each click of the enter button? or when the counter goes up?
//For the next iteration of this game, I need to add in the math function. I think I can use if (Math.floor((Math.random() - 0.5) > 0) {use +} else {use -},
//but do I need to use string to number method to check for correct answers?
//Below is my timer code. Already copy and pasted into "Enter"'s if else statement.
//==========================================================================================================================================================

// const timerDisplay = document.querySelector(".timer");
// let timer = 10;
// timerDisplay.textContent = `Time: ${timer}`;

// function countdown() {
//   timer--;
//   timerDisplay.textContent = `Time: ${timer}`;
//   if (timer === 0) {
//     gameLost();
//   }
// }

// function countdownTimer() {
//   setInterval(countdown, 1000);
// }

// countdownTimer();

// const coundownTimer = setInterval(countdown, 1000);
//============================================================================================================================================================
