const express = require("express");
const https = require("https");
const app = express();
const parser = require("body-parser");
require('dotenv').config();
const { urlencoded } = require("body-parser");
const apiKey = process.env.API_KEY;
const PORT = process.env.PORT || 3000;
app.use(parser.urlencoded({extended: true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
app.post("/",(req,res)=>{
    var city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+apiKey+"&units=metric";
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            const desc = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            res.write("<h1>The temperature in "+weatherData.name+" is "+temp+" degrees Celsius and the weather is "+desc+".</h1>");
            res.write("<img src="+icon+">");
            res.send();
        })
    })
})
app.listen(PORT,()=>{
    console.log(`Server running on ${ PORT }`);
})