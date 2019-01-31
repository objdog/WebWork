var express = require("express");

var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res){
    res.send("Hi there!");
});
// "/bye" => "So long"
app.get("/bye", function(req, res){
    res.send("So long!");
})
// "/dog" => "Meow!"
app.get("/dog", function(req, res){
    res.send("Meow!");
})

app.get("/r/:subredditName", function(req, res) {
    var subreddit = req.params.subredditName;
    res.send("WELCOME TO THE " + subreddit.toUpperCase() + " SUBREDDIT.");
})

app.get("/r/:subredditName/comments/:id/:title", function(req, res) {
    res.send("This is the comments page for ")
})

app.get("*", function(req, res){
    res.send("You are a star!");
})


// Wakeup the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Listening on " + process.env.PORT + " at " + process.env.IP)
});