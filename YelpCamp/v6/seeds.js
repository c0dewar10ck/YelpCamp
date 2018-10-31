var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
    
var data = [
    {
        name:"Mountain Pass",
        image:"https://farm3.staticflickr.com/2839/11407596925_a0f9f4abf0.jpg",
        description:"My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand?"
    },    
    {
        name:"Deer Ditch",
        image:"https://farm9.staticflickr.com/8531/8561159139_95e9b9ca2b.jpg",
        description:"Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass."
    },    
    {
        name:"Not A Campground",
        image:"https://farm9.staticflickr.com/8376/8583478216_9461da19e9.jpg",
        description:"Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb."
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
}    

module.exports = seedDb;