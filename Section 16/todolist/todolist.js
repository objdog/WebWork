var lis = document.querySelectorAll("li");

for (var i = 0; i < lis.length; i++) {
  lis[i].addEventListener("mouseover", mouseHoverOn);
  lis[i].addEventListener("mouseout", mouseHoverOff);
  lis[i].addEventListener("click", function(){
    this.classList.toggle("done");
  })
}

function mouseHoverOn() {
  this.classList.add("selected");
}
function mouseHoverOff() {
  this.classList.remove("selected");
}
