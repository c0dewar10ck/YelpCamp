var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
    
var data = [
    {
        name:"Mountain Pass",
        image:"https://farm3.staticflickr.com/2839/11407596925_a0f9f4abf0.jpg",
        description:"It's actually illegal to camp here. Something about a Yeti, I think..."
    },    
    {
        name:"Deer Ditch",
        image:"https://farm9.staticflickr.com/8531/8561159139_95e9b9ca2b.jpg",
        description:"Not much room to camp but there are a whole bunch of deer, if you're into that sort of thing."
    },    
    {
        name:"Not A Campground",
        image:"https://farm9.staticflickr.com/8376/8583478216_9461da19e9.jpg",
        description:"Private Property: Keep Out!"
    }
]

function seedDb(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "Well, I didn't die. So I guess there's that.",
                            author: "Obama"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save(); 
                                console.log("created new comment");
                            }
                        });
                }
            }); 
        });
    });
    //add a few comments
}    

module.exports = seedDb;