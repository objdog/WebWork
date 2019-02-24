var express = require('express');
var router = express.Router();

var Campground = require("../models/campground");
var Comment = require("../models/campground");
//==================
// CAMPGROUND ROUTES
//==================

// GET ROUTES /



router.get("/" , function(req, res){
    // Get all the campgrounds from the db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
    //Render the file
    // res.render("campgrounds", {campgrounds: campgrounds});
});

router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs");
});

router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show" , {campground: foundCampground});
        }
    });
    
});

// POST ROUTES //

router.post('/', isLoggedIn, function(req, res){
   //get data from form and add to campgrounds array
   //rediret to campgrounds page.
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   
   var newCampground = {name: name, image: image, description: description};
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
   });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;
