//==============//
// Server Setup //
//==============//

var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require('mongoose');

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//==============//
// SCHEMA SETUP //
//==============//

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground" , campgroundSchema);


//==============//        
// ROUTES SETUP //
//==============//



//-----------------------//
// RESTful Routing Table //
//-----------------------//

/* NAME:     ROUTE:            TYPE:       DESCRIPTION:
==================================================================
   ROOT        /                GET         Landing page for the application.
   INDEX       /campgrounds     GET         Listing of all campsites.
   NEW         /campgrounds/new GET         Displays a form for adding a campsite
   CREATE      /campgrounds     POST        Creates the new site and redirects to INDEX
   SHOW        /show/:id        GET         Shows more details about a selected site
   
   
=================================================================*/


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
            res.render("index", {campgrounds:allCampgrounds})
        }
    });
    //Render the file
    // res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new" , function(req, res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id , function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show" , {campground: foundCampground});
        }
    });
    
});

// POST ROUTES //

app.post('/campgrounds' , function(req, res){
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

//==================//
// START THE SERVER //
//==================//

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started.");
});