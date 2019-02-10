//Server Setup//
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
        {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f9c97aa2eebdb1_340.jpg"},
        {name: "Mount Pleasant", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104491f9c97aa2eebdb1_340.jpg"},
        {name: "Whoopy Hollow", image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b014459cf8c27ca4e5bc_340.jpg" },
        {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f9c97aa2eebdb1_340.jpg"},
        {name: "Mount Pleasant", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104491f9c97aa2eebdb1_340.jpg"},
        {name: "Whoopy Hollow", image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b014459cf8c27ca4e5bc_340.jpg" },
        {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f9c97aa2eebdb1_340.jpg"},
        {name: "Mount Pleasant", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104491f9c97aa2eebdb1_340.jpg"},
        {name: "Whoopy Hollow", image: "https://pixabay.com/get/e03db50f2af41c22d2524518b7444795ea76e5d004b014459cf8c27ca4e5bc_340.jpg" }
    ]
        
//Routes Setup//
app.get("/" , function(req, res){
    res.render("landing");
});

app.get("/campgrounds" , function(req, res){

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new" , function(req, res){
    res.render("new.ejs");
});

app.post('/campgrounds' , function(req, res){
   //get data from form and add to campgrounds array
   //rediret to campgrounds page.
   var name = req.body.name;
   var image = req.body.image;
   
   var newCampground = {name: name, image: image}
   campgrounds.push(newCampground);
   res.redirect("/campgrounds");
});

//Start the server//
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started.");
});