const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const temp = "";
var iconurl;
const des = "";
const options = {
    day : "numeric",
    month : "short",
    weekday : "short",
    };
const date = new Date().toLocaleDateString('en-US',options);

const app = express();
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {

    const query = req.body.cityName

    res.render('index',{
        des : des,
        iconurl : iconurl,
        temp : temp,
        date : date,
        query : query
    });

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
           
           res.render('index', {
               des : des,
               iconurl : iconurl,
               temp : temp,
               date : date,
               query : query
           });
        })
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port 3000");
})