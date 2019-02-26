var express = require('express');
var router = express.Router();

var Campground = require("../models/campground");
var Comment = require("../models/campground");
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
router.get("/new", isLoggedIn, function(req, res){
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
router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    }); 
});

//-- UPDATE ROUTE

router.put("/:id", isLoggedIn, function(req, res){
    // find and update campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
    //redirect elsewhere
})

//-- CREATE ROUTE
router.post('/', isLoggedIn, function(req, res){
   //get data from form and add to campgrounds array
   //rediret to campgrounds page.
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
       id: req.user.id,
       username:req.user.username
   };
   var newCampground = {name: name, image: image, description: description, author: author};
   
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
   });
});

//-- DESTROY ROUTE
router.delete("/:id", isLoggedIn, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});
//-- AUTHENTICATION CHECKER
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}


//-- AUTHORIZATION CHECKER
function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } else {
                res.redirect("back");
            }
            
        }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;
