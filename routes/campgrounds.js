var express = require("express");
var Campground = require("../models/campground");
var router  = express.Router();
var middleware = require("../middleware");


router.get("/",function(req,res){
    Campground.find({},function(err,allcampgrounds){
       if(err)
        console.log("something went wrong");
        else 
        {
        res.render("camp/index",{campgrounds:allcampgrounds});
        }
    });
});

router.post("/",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var url=req.body.url;
    var desc=req.body.description;
    var price=req.body.price;
    var author={
        id:req.user._id,
        username: req.user.username
    };
    var newCampground={name:name,price:price,url:url,description:desc,author:author};
    Campground.create(newCampground,function(err,campground){
    if(err)
    console.log("something went wrong");
    else
    res.redirect("/campgrounds");
    });
});

router.get("/new",middleware.isLoggedIn,function(req, res) {
   res.render("camp/new"); 
});

router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err||foundcampground == undefined){
            console.log(err);
            req.flash("err","Campground not found");
            return res.redirect("/campgrounds");
        }
        else
            res.render("camp/show",{campground:foundcampground});
    });
});

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
        Campground.findById(req.params.id,function(err,foundcampground){
             if(err||foundcampground == undefined){
                console.log(err);
                req.flash("err","Campground not found");
                return res.redirect("/campgrounds");
            }
            res.render("camp/edit",{campground:foundcampground});
    });
});

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){

    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updateCamp){
        if(err) {
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
       if(err){
            res.redirect("/campgrounds");
       }else{
            res.redirect("/campgrounds");
       }
   });
});



module.exports = router;