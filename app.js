const express= require("express")
const https= require("https");
const bodyParser=require("body-parser");

const app = express()

app.use(bodyParser.urlencoded({extended:true}));

app.get ("/",function(req,res  ){
  res.sendFile(__dirname +"/index.html");
 });

  app.post("/",function(req,res)   {
  const city=req.body.cityName
  const api="bedfefd27eda9f84d459ac6746fbfa08"
  const degree="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api+"&units="+degree+""

  https.get(url,(response)=>{
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData =JSON.parse(data);
      const temp=weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      res.write("<h1>The temp is "+temp+" </h1>");
      res.send();
    });
  });
});

app.listen(3000,function(){
  console.log("heyy");
});
