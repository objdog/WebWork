const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const Campground = require("../models/campground");
const Comment = require("../models/campground");
//==================
// CAMPGROUND ROUTES
//==================


//-- INDEX ROUTE

router.get("/" , function(req, res){
    // Get all the campgrounds from the db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});


//-- NEW ROUTE

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs");
});


//-- SHOW ROUTE

router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show" , {campground: foundCampground});
        }
    });
    
});


//-- EDIT ROUTE

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    }); 
});

//-- UPDATE ROUTE

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//-- CREATE ROUTE

router.post('/', middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var cost = req.body.cost;
   var author = {
       id: req.user.id,
       username:req.user.username
   };
   var newCampground = {name: name, image: image, description: description, cost: cost, author: author};
   
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
   });
});

//-- DESTROY ROUTE

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});



module.exports = router;
