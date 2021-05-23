const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static("style"));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {

    res.sendFile(__dirname+"/index.html")

})

app.post('/', (req, res) => {

    const query = req.body.cityName
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid=b6ecae10def5e08f160321f0865be847&units=metric';

    https.get(url, (response) => {
 
        response.on("data", (data) => {
           const wd = JSON.parse(data);
           const des = wd.weather[0].description;
           const icon = wd.weather[0].icon;
           const temp = wd.main.temp;
           const iconurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
  
           res.write("<h1>The temp in "+ query +" is "  + temp + " C.</h1>")
           res.write("<p>The weather is " + des + "p")
           res.write("<img src = " + iconurl + ">")
           res.send()
        })
    })


})


app.listen(3000, () => {
    console.log("listening on port 3000");
})