//jshint esversion:6
const express=require('express');
const bodyParser = require('body-parser');
const https = require('https');
const { response } = require('express');
const app = express();

//get
app.use(bodyParser.urlencoded({ extended:true}));
app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});
app.post('/', function(req, res){

    const city=req.body.cityName;
    const apiKey="658fadc35a9bda6dc45a7f111134d2ca";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ city +"&APPID="+ apiKey +"&units="+units;
    https.get(url, function(response){
        response.on('data', function(data){
            const weatherData=JSON.parse(data);
            const weather_feelLike=weatherData.main.feels_like;
            const weather_weather=weatherData.weather[0].main;
            const weather_icon=weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/"+weather_icon+"@2x.png";
            res.write("<head><meta charset='UTF-8' /></head>");
            res.write("<h1>weather feels like: " + weather_feelLike+"</h1>");
            res.write("<p>Weather in "+city+ " is "+weather_weather+"</p>");
            res.write("<img src="+imageURL+">");
            res.send();
        });
    });
});
app.listen(3000,function(){
    console.log('listening on port 3000');
});

