var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj ={};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
     if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundcampground){
       if(err){
           req.flash("err","Campround not found");
           res.redirect("back");
       } 
       else{
           if(!foundcampground){
               req.flash("err","Item not found");
               return res.redirect("back");
           }
           if(foundcampground.author.id.equals(req.user._id)){
              next();
           }
           else  {
              req.flash("err","You don't have permission to do that!");
              res.redirect("back");
           }
       }
    });
    }
    else{
        req.flash("error","you need login to do that");
        res.redirect("/login");
    }
};

middlewareObj.checkCommentOwnership=function(req,res,next){
     if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundcomment){
       if(err) res.redirect("back");
       else{
           if(foundcomment.author.id.equals(req.user._id)){
              next();
           }
           else  {
              req.flash("error","You don't have permission to do that");
              res.redirect("back");
           }
       }
    });
    }
    else{
        req.flash("error","You need login");
        res.redirect("/login");
    }
};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login!");
    res.redirect("/login");
}

module.exports = middlewareObj