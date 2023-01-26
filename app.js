  const express = require("express");
  const https = require("https");
  const bodyParser = require("body-parser");

  const app = express();

  app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req , res){
res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req , res){

const query = req.body.cityName;
const apiKey = "db41630731c411bc912695794526d7b7";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit ;
https.get(url , function(response){
  console.log(response.statusCode);

  response.on("data", function(data){

    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const weatherDescription = weatherData.weather[0].description
    const minTemp = weatherData.main.temp_min
    const maxTemp = weatherData.main.temp_max
    const pressure = weatherData.main.pressure
    const humidity = weatherData.main.humidity
    const visibility = weatherData.visibility
    const  windSpeed= weatherData.wind.speed
    const icon = weatherData.weather[0].icon

    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
res.write("<h1> The weather conditions of " + query + " </h1>");
res.write("<h2> The tempreature is " + temp + "celcius </h2>");
res.write("<h2> The description is " + weatherDescription + "</h2>");
res.write("<h2> The minimum tempreature is " + minTemp + "</h2>");
res.write("<h2> The maximum tempreature is " + maxTemp + "</h2>");
res.write("<h2> The pressure is " + pressure + "</h2>");
res.write("<h2> The humidity is " + humidity + "% </h2>");
res.write("<h2> The visibility is " + visibility + "</h2>");
res.write("<h2> The wind speed is " + windSpeed + "</h2>");



res.write("<img src=" + imageURL+ ">");
res.send()
  })
})

})




  app.listen(4000 , function(){

    console.log("Server is running");
  });
