const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const mongoose = require('mongoose');
const state="Search Your State";
const stateNames =[];
const tableConfirmed=[];
const tableActive=[];
const tableRecovered=[];
const tableDeceased=[];

const states =[];
const app = express();
const err = "Please Search Correct State";
const commaNumber = require("comma-number");
const err1= "Error";

app.set('view engine', 'ejs');
const action = "active"; 

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var today = new Date();
var yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
var date = yesterday.toISOString().slice(0,10);

app.get("/",function(req,res){

  const url = "https://covid19-stats-api.herokuapp.com/api/v1/cases?country=India";
  https.get(url, function(response){
      response.on("data",function(data){
          let covidData = JSON.parse(data);
          let confirmed = commaNumber(covidData.confirmed);
          let deaths = commaNumber(covidData.deaths);
          let recovered =commaNumber( covidData.recovered);
          res.render("home",{confirmed1:confirmed, deaths1:deaths, recovered1:recovered,state:state,stateNames:stateNames,tableConfirmed:tableConfirmed,tableActive:tableActive,tableDeceased:tableDeceased,tableRecovered:tableRecovered});

      });
 
  
     
  });
  const url3="https://covid-api.com/api/reports?date="+date+"&q=India&iso=IND&region_name=India";
  https.get(url3,function(response){
    response.on("data",function(data3){
      let table = JSON.parse(data3);
      for(let i=0; i<37;i++){
        let stateName = table.data[i].region.province;
        stateNames.push(stateName);
        let tableconfirmed = table.data[i].confirmed;
        tableConfirmed.push(tableconfirmed);
        let tableactive =table.data[i].active;
        tableActive.push(tableactive);
        let tablerecovered = table.data[i].recovered;
        tableRecovered.push(tablerecovered);
        let tabledeceased = table.data[i].deaths;
        tableDeceased.push(tabledeceased);

      }
    
      
      
      
      
      

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
  
  const url1 = "https://covid-api.com/api/reports?date="+date+"&q=India&iso=IND&region_name=India&region_province="+state+"";
  
  https.get(url1, function(response){
      response.on("data",function(data1){

          let covidStateData = JSON.parse(data1);
          let confirmedState = commaNumber(covidStateData.data[0].confirmed);
          let deathsState = commaNumber(covidStateData.data[0].deaths);
          let recoveredState = commaNumber(covidStateData.data[0].recovered);

          res.render("home",{confirmed1:confirmedState, deaths1:deathsState, recovered1:recoveredState,state:state,stateNames:stateNames,tableConfirmed:tableConfirmed,tableActive:tableActive,tableDeceased:tableDeceased,tableRecovered:tableRecovered});

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
