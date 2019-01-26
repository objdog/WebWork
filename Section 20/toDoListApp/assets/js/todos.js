//Check off specific todos by clicking
$("ul").on("click", "li", function() {
  $(this).toggleClass("complete");
});
//Delete todos by clicking on the delete button
$("ul").on("click", "span", function(event) {
  $(this).parent().fadeOut(400,function(){
    $(this).remove();
  })
  event.stopPropagation();
});
//Hide the input when the pencil icon is clicked
$("#edit").on("click", function() {
  $("input[type='text']").slideToggle();
});

$("input[type='text']").keypress(function(event){
  if (event.which === 13) {
    //grab the contents of the input and clear the input
    var toDoText = $(this).val();
    $(this).val("");
    //create new li and add to ul
    $("ul").append("<li><span><i class='fas fa-trash-alt'></i></span>" + toDoText + "</li>")
  }
});
