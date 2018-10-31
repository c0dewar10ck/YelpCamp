var express     = require("express"),
    middleware  = require("../middleware"),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    router      = express.Router({mergeParams: true});

//NEW COMMENT FORM ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "Cannot find campground");
            console.log(err);
        } else {
            res.render("comments/new", {campground:campground});
        }
    });
});

//COMMENT CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
   //look up campground using id
   Campground.findById(req.params.id, function(err, campground){
      if(err){
          req.flash("error", "Cannot find campground");
          console.log(err);
          res.redirect("/campgrounds");
      } else {
        Comment.create(req.body.comment, function(err, comment){
            if(err){
                req.flash("error", "Comment creation failed");
                console.log(err);
            } else {
                //add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                //save comment
                comment.save();
                campground.comments.push(comment);
                campground.save();
                req.flash("success", "Comment created");
                res.redirect("/campgrounds/" + campground._id);
            }
        });
      }
   });
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            req.flash("error", "Cannot find comment");
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            req.flash("error", "Cannot find comment");
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          req.flash("error", "Cannot find comment");
          res.redirect("back");
      } else {
          req.flash("success", "Comment deleted");
          res.redirect("/campgrounds/" + req.params.id);
      }
   }); 
});

module.exports = router;