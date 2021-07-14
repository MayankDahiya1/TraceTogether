const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');
const action = "active"; 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req,res){
      res.render("home");
  });
  app.get("/register",function(req,res){
    res.render("register");
  });

  app.get("/blog", function(req,res){
    res.render("blog");
  });
app.get("/about", function(req,res){
  res.render("about");
});
app.get("/resources", function(req,res){
  res.render("resources");
});
app.get("/contact", function(req,res){
  res.render("contact");
});

  app.listen(3000, function() {
    console.log("Server started on port 3000");
  });