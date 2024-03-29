//==============//
// Server Setup //
//==============//

var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require('mongoose'),
    Campground     = require('./models/campground'),
    Comment        = require("./models/comment"),
    // seedDB         = require('./seeds'),
    flash          = require("connect-flash"),
    methodOverride = require("method-override"), 
    passport       = require('passport'),
    LocalStrategy  = require("passport-local"),
    User           = require("./models/user");

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
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//=================//
// PASSPORT CONFIG //
//=================//

app.use(require('express-session')({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds/", campgroudRoutes);


//==================//
// START THE SERVER //
//==================//

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started.");
});