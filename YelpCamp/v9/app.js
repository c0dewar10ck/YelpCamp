var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    User            = require("./models/user"),
    LocalStrategy   = require("passport-local"),
    seedDb          = require("./seeds");

//require routes    
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes          = require("./routes/index");
    
mongoose.connect("mongodb://localhost/yelp_camp_v9");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// seedDb(); //seed the database

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Winston still lives",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//feed currentUser var into every page
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//use route files
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Server Started");
});