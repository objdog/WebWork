var express = require("express");

var app = express();

app.get("/", function(req, res){
    res.send("Welcome to the homepage");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Express server has started");
});