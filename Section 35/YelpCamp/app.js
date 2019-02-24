//==============//
// Server Setup //
//==============//

var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require('mongoose'),
    Campground = require('./models/campground'),
    Comment    = require("./models/comment"),
    seedDB     = require('./seeds'),
    passport   = require('passport'),
    LocalStrategy = require("passport-local"),
    User          = require("./models/user");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//=================//
// PASSPORT CONFIG //
//=================//

app.use(require('express-session')({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
//==============//        
// ROUTES SETUP //
//==============//



//-----------------------//
// RESTful Routing Table //
//-----------------------//

/* NAME:     ROUTE:                     TYPE:       DESCRIPTION:
================================================================================================
   ROOT        /                        GET         Landing page for the application.
   INDEX       /campgrounds             GET         Listing of all campsites.
   NEW         /campgrounds/new         GET         Displays a form for adding a campsite
   CREATE      /campgrounds             POST        Creates the new site and redirects to INDEX
   SHOW        /campgrounds/:id         GET         Shows more details about a selected site
   EDIT        /campgrounds/:id/edit    GET         Populates a form with specific campground info
   UPDATE      /campgrounds/:id         PUT         Updates the information of a specific campground
   DELETE      /campgrounds/:id         DELETE      Removes a campground record from the DB.
   
==============================================================================================*/

//==================
// CAMPGROUND ROUTES
//==================

// GET ROUTES /

app.get("/" , function(req, res){
    res.render("landing");
});

app.get("/campgrounds" , function(req, res){
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

app.get("/campgrounds/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show" , {campground: foundCampground});
        }
    });
    
});

// POST ROUTES //

app.post('/campgrounds', isLoggedIn, function(req, res){
   //get data from form and add to campgrounds array
   //rediret to campgrounds page.
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   
   var newCampground = {name: name, image: image, description: description}
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
   });
});

//================
// COMMENTS ROUTES
//================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground})
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else{
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id);
               }
           });
       }
    });
    //create new commment
    //connect new comment to campground
    //redirect to the show page
});

//======================//
// AUTHORIZATION ROUTES //
//======================//

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});


// PAY NO ATTENTION, DEBUG CODE

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//         description: "This is a huge granite hill, no bathrooms. No water. No Electricity. Beautiful granite!"
//     },
//     function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Newly Created Campground:");
//             console.log(campground);
//         }
//     });


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
};


//==================//
// START THE SERVER //
//==================//

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started.");
});