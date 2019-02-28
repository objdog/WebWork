var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "Please Login First");
    res.redirect("/login");
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Comment not found.");
            res.redirect("back");
        } else {
            if(foundComment.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You are not authorized to make this modification.");
                res.redirect("/campgrounds" + req.params.id);
            }
            
        }
        });
    } else {
        req.flash("error", "You must be logged in.");
        res.redirect("/login");
    }
}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found.");
            res.redirect("/campgrounds");
        } else {
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error","You are not authorized to make this modification.");
                res.redirect("/campgrounds/" + req.params.id);
            }
            
        }
        });
    } else {
        req.flash("error", "You must be logged in.");
        res.redirect("/login");
    }
}



module.exports = middlewareObj;