var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      reset();
    });
  }
}

function setupSquares() {
  //setting up square event listeners and victory logic.
  for (var i = 0; i < squares.length; i++) {
    //add click listeners to squares
    squares[i].addEventListener("click", function(){
      // grab color of clicked squares
      var clickedColor = this.style.backgroundColor;
      //compare color to pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetButton.textContent = "Play Again?";
      }else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again!";
      }
    });
  }
}

function reset() {
  //generate all new Colors
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked colors
  colorDisplay.textContent = pickedColor;
  //change colors of squares
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
}
//Below is the original code for how the difficulty setting buttons worked
//keeping for reference.
// easyBtn.addEventListener("click", function(){
//   easyBtn.classList.add("selected");
//   hardBtn.classList.remove("selected");
//   numSquares = 3;
//   colors = generateRandomColors(numSquares);
//   pickedColor = pickColor();
//   colorDisplay.textContent = pickedColor;
//   h1.style.backgroundColor = "steelblue";
//   for (var i = 0; i < squares.length; i++) {
//     if (colors[i]) {
//       squares[i].style.background = colors[i];
//     }else {
//       squares[i].style.display = "none";
//     }
//   }
// });
// hardBtn.addEventListener("click", function(){
//   hardBtn.classList.add("selected");
//   easyBtn.classList.remove("selected");
//   numSquares =6;
//   colors = generateRandomColors(numSquares);
//   pickedColor = pickColor();
//   colorDisplay.textContent = pickedColor;
//   h1.style.backgroundColor = "steelblue";
//   for (var i = 0; i < squares.length; i++) {
//       squares[i].style.background = colors[i];
//       squares[i].style.display = "block";
//   }
// });
resetButton.addEventListener("click", function(){
  reset();
});

function changeColors(color) {
  //Loop through the squares to change each to match the given color.
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  //make an array
  var arr = [];
    //repeat num times
  for (var i = 0; i < num; i++) {
    //get random color and push to array
    arr.push(randomColor());
  }
    // return the array.
  return arr;
}

function randomColor() {
  //pick a "red" from 0 - 255
  var red = Math.floor(Math.random() * 256);
  //pick a "green" from 0 - 255
  var green = Math.floor(Math.random() * 256);
  //pick a "blue" from 0 - 255
  var blue = Math.floor(Math.random() * 256);
  //concatenate the rgb statement and return
  return "rgb("+ red + ", " + green + ", " + blue + ")";
}
//test
