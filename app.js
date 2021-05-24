const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

/* app.set('view engine', 'ejs'); */

app.use(express.static("style"));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {

    res.sendFile(__dirname+"/index.html")

})

app.post('/', (req, res) => {

    const query = req.body.cityName
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&appid=XXXX&units=metric';

    https.get(url, (response) => {
 
        response.on("data", (data) => {
           const wd = JSON.parse(data);
           const des = wd.weather[0].description;
           const icon = wd.weather[0].icon;
           const temp = wd.main.temp;
           const press = wd.main.pressure;
           const hum = wd.main.humidity;
           const iconurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
           res.write("<body style=\"background-color:#90e0ef;\">")
           res.write("<p style=\"text-align:center; padding: 50px 0 0 0 ;font-size: 30px; font-family:arial\">The current temperature in "+ query +" is <b>" + temp +" <span>&#176;</span>C</b></p>")
           res.write("<p style=\"text-align:center; padding: 15px; font-size: 30px;font-family:arial\">Pressure : " + press + " Pa   Humidity : "+ hum +"</p>")
           res.write("<p style=\"text-align:center; padding: 15px; font-size: 30px;font-family:arial\">The weather is " + des + "</p>")
           res.write("<div style=\"text-align:center;\">")
           res.write("<img style=\" left-margin : 500px\" widht=100 height=100 src = "+ iconurl + ">")
           res.write("</div>")
           res.write("</body>")
           /* res.render('ejs/index', {
               query : query,
               temp : temp,
               des : des,
               iconurl : iconurl
           }); */
           res.send()
        })
    })


})


app.listen(3000, () => {
    console.log("listening on port 3000");
})