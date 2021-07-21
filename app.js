const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const mongoose = require('mongoose');
const state="Search Your State";
const app = express();
const commaNumber = require("comma-number");

app.set('view engine', 'ejs');
const action = "active"; 
const confirmed1 =[];
const deaths1=[];
const recovered1=[];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  const url = "https://covid19-stats-api.herokuapp.com/api/v1/cases?country=India";
  https.get(url, function(response){
      response.on("data",function(data){
          let covidData = JSON.parse(data);
          let confirmed = commaNumber(covidData.confirmed);
          let deaths = commaNumber(covidData.deaths);
          let recovered =commaNumber( covidData.recovered);
          res.render("home",{confirmed1:confirmed, deaths1:deaths, recovered1:recovered,state:state});

      });

     
  });
});
function clearArray(array) {
  while (array.length) {
    array.pop();
  }
}
app.post("/", function(req,res){
  let state = req.body.search;
  
  const url1 = "https://covid-api.com/api/reports?date=2021-07-20&q=India&iso=IND&region_name=India&region_province="+state+"";
  
  https.get(url1, function(response){
      response.on("data",function(data1){

          let covidStateData = JSON.parse(data1);
          let confirmedState = commaNumber(covidStateData.data[0].confirmed);
          let deathsState = commaNumber(covidStateData.data[0].deaths);
          let recoveredState = commaNumber(covidStateData.data[0].recovered);

          res.render("home",{confirmed1:confirmedState, deaths1:deathsState, recovered1:recoveredState,state:state});
           
      });
      
      
  });
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
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function() {
  console.log("Server started");
});
