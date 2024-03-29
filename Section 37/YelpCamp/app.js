//==============//
// Server Setup //
//==============//

var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require('mongoose'),
    Campground    = require('./models/campground'),
    Comment       = require("./models/comment"),
    // seedDB        = require('./seeds'),
    methodOverride = require("method-override"), 
    passport      = require('passport'),
    LocalStrategy = require("passport-local"),
    User          = require("./models/user");

//==============//        
// ROUTES SETUP //
//==============//

var commentRoutes   = require("./routes/comments"),
    campgroudRoutes = require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index");


//==============//
// HOUSEKEEPING //
//==============//

// seedDB(); //Seeds the database with some test data.
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

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

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds/", campgroudRoutes);





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


 


//==================//
// START THE SERVER //
//==================//

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started.");
});