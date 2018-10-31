var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Sahara Dream", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name: "Deer Grotto", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
    {name: "Sahara Dream", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name: "Deer Grotto", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
    {name: "Sahara Dream", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name: "Deer Grotto", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"},
    {name: "Sahara Dream", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name: "Deer Grotto", image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg"}
]

app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds:campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.post("/campgrounds", function(req, res) {
   //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image}
   campgrounds.push(newCampground);
   //redirect back to campgrounds page
   res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Server Started");
});