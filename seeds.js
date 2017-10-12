var mongoose= require("mongoose");
var Campground=require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name : "first one",
        url : "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description:"bla bla bla"
    },
    {
        name : "second one",
        url : "https://farm5.staticflickr.com/4129/5012190187_bf49c45fd4.jpg",
        description:"hhhhh6666"
    },
    {
        name : "third one",
        url : "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description:"333333333333"
    }
    ]

function seedDB(){
    //remove all 
    Campground.remove({}, function(err){
      if(err) console.log(err);
      else console.log("removed campgrounds");
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err) console.log(err);
                else{
                  console.log("add one");
                  Comment.create({
                      text:"this is good",
                      author:"someone"
                  },function(err,comment){
                      if(err) console.log(err);
                      else{
                      campground.comments.push(comment);
                      campground.save();
                      console.log("create one comments");
                      }
                  });
                }
            })
        }); 
    });
    //ADD COMMENTS
    
}


module.exports = seedDB;