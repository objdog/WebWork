var button = document.querySelector("#color_change");
var body = document.querySelector("body");
var changed = false;
//This is the first way I did it.
// button.addEventListener("click", function(){
//   if (changed === false) {
//       body.style.backgroundColor = "purple";
//   }
//   else {
//     body.style.backgroundColor = "white";
//   }
//   changed = !changed
// })

//This is a nifty shorter way to leverage CSS classes to do it.
button.addEventListener("click", function(){
  document.body.classList.toggle("purple");
});
