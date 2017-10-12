var express     = require("express"),
     app        = express(),
     bodyParser = require("body-parser"),
     mongoose   = require("mongoose"),
     User       = require("./models/user"),
     passport   = require("passport"),
     LocalStrategy = require("passport-local"),
     methodOverride     = require("method-override"),
     //seedDB     = require("./seeds"),
     campgroundRoutes = require("./routes/campgrounds"),
     indexRoutes =  require("./routes/index"),
     commentRoutes=require("./routes/comments"),
     flash      =require("connect-flash");
     
var url = process.env.DATABASEURL || "mongodb://localhost/yelpcamp";

mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
//seedDB();

app.use(require("express-session")({
    secret: "blablabla",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser  =req.user;
   res.locals.error =req.flash("error");
   res.locals.success =req.flash("success");
   next();
});

app.use("/campgrounds",campgroundRoutes);
app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT,process.env.IP, function(){
   console.log("right"); 
});