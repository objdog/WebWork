var p1Button = document.querySelector("#p1");
var p2Button = document.getElementById("p2");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var resetButton = document.querySelector("#reset");
var playingToDisplay = document.querySelector("#playingToDisplay");
var numInput = document.querySelector("input");
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 5;

p1Button.addEventListener("click", function(){
  if (!gameOver) {
    p1Score++;
    if (p1Score === winningScore) {
      p1Display.classList.add("winner");
      gameOver = true;
    }
    p1Display.textContent = p1Score;
    console.log(p1Score);
  }
});

p2Button.addEventListener("click", function(){
  if (!gameOver) {
    p2Score++;
    if (p2Score === winningScore) {
      p2Display.classList.add("winner");
      gameOver = true;
    }
    p2Display.textContent = p2Score;
    console.log(p2Score);
  }
})

resetButton.addEventListener("click", function(){
  winningScore = 5;
  gameOver = false;
  p1Score = 0;
  p2Score = 0
  p1Display.classList.remove("winner");
  p2Display.classList.remove("winner");
  p1Display.textContent = p1Score;
  p2Display.textContent = p2Score;

})

numInput.addEventListener("change", function(){
  if (p1Score === 0 && p2Score === 0) {
    playingToDisplay.textContent = numInput.value;
    winningScore = Number(numInput.value);
  } else {
    alert("You cannot change game length during the game!");
  }

})
