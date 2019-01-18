var todos = ["Buy New Turtle"];
window.setTimeout(function() {
  var input = prompt("What would you like to do?");
  function reportList() {
    console.log("*******");
    todos.forEach(function(todo, index, arr) {
      console.log(index + " : " + todo);
    })
    console.log("*******");
  }
  function newTodo() {
    //ask for new // TODO:
    var newTodo = prompt("Enter new todo:");
    //add to todos array
    todos.push(newTodo);
  }
  function deleteTodo() {
    var deleteTodo = prompt("What index to delete?");
    todos.splice(deleteTodo, 1);
  }
  while(input != "quit") {
    if (input === "list") {
      reportList();
    } else if (input === "new") {
      newTodo();
    } else if (input === "delete") {
      deleteTodo();
    }
    //ask again
    input = prompt("What would you like to do?");
  }
  console.log("Ok you quit the app");
}, 500);
