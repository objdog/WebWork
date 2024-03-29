const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require('../models/user');


//root route
router.get("/" , function(req, res){
    res.render("landing");
});

//======================//
// AUTHORIZATION ROUTES //
//======================//

//registration form route
router.get("/register", function(req, res) {
    res.render("register", {page: "register"});
});

//registration db update route
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//login page route
router.get("/login", function(req, res) {
    res.render("login", {page: 'login'});
});

//login session update route
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//logout session update route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/campgrounds");
});


module.exports = router;