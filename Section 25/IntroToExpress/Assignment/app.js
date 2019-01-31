var express = require('express');
var app = express();

function animalSays(animal){
  var says = "";
  if (animal === "pig") {
      return "Oink!";
  } else if (animal === "cow") {
      return "Moo";
  } else if (animal === "dog"){
      return "Woof Woof!";
  } else {
      return "Ungh!"
  }
};

app.get("/", function(req, res){
   res.send("Hi there, welcome to my assignment!"); 
});

app.get("/speak/:animal", function(req, res){
    var animal = req.params.animal.toLowerCase();
    res.send("The " + animal + " says " + animalSays(animal));
});

app.get("/repeat/:saying/:num", function(req, res) {
    var saying = req.params.saying;
    var num = Number(req.params.num);
    var result = []
    
    for (var i = 0; i < num; i++) {
        result.push(saying)
    }
    res.send(result.join(' '));
    
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Listening on " + process.env.PORT + " at " + process.env.IP)
});