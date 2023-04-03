const userDisplay = document.querySelector(".userDisplay");
const randOperation = document.querySelector(".randOperation");
const randomNumber = document.querySelector(".randomNumber");

function rO() {
  if (Math.random() > 0.5) {
    randOperation.textContent = "+";
  } else {
    randOperation.textContent = "-";
  }
}
rO();

userDisplay.textContent = Math.floor(Math.random() * 1000000);
randomNumber.textContent = Math.floor(Math.random() * 1000);

const checkAnswer = document.querySelector(".checkAnswer");
checkAnswer.textContent = `${userDisplay.textContent} ${randOperation.textContent} ${randomNumber.textContent}`;

const finalAnswer = document.querySelector(".finalAnswer");
finalAnswer.textContent = 0;

if (randOperation === "+") {
  finalAnswer.textContent = userDisplay.textContent + randomNumber.textContent;
} else {
  finalAnswer.textContent = userDisplay.textContent - randomNumber.textContent;
}
