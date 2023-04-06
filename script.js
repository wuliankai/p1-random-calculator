const easy = document.querySelector(".Easy");
const math = document.querySelector(".Math");
const wtf = document.querySelector(".wtf");

easy.addEventListener("click", function (event) {
  window.location.href = "randomCalculator/randomCalculator.html";
});

math.addEventListener("click", function () {
  window.location.href = "randCalcV2/randCalcV2.html";
});

wtf.addEventListener("click", function () {
  window.location.href = "randCalcV3/randCalcV3.html";
});
