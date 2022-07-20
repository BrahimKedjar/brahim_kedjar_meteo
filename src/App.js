import Search from "./componentes/searche/Searche";
import './App.css'
import { useState } from "react";
import { weather_api_url,weather_api_key } from "./Api";
import CurrentWeather from "./componentes/curret-weather/Current-weather";
import Forecast from "./componentes/forecast/forecast";
function App() {
  const [currentWeather, setcurrentWeather] = useState(null);
  const [forecast, setforecast] = useState(null);
  const handelOnSearchChange =(searchData) =>{
    const [lat,lon]=searchData.value.split(" ");
    const currentweatherfetch = fetch(`${weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`)
    const forecastfetch = fetch(`${weather_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`)
    Promise.all([currentweatherfetch, forecastfetch])
    .then(async(response)=>{
      const weatherresponse = await response[0].json()
      const forecastresponse = await response[1].json()
      setcurrentWeather({city : searchData.label , ...weatherresponse})
      setforecast({ city: searchData.label , ...forecastresponse})
    }).catch((err) => console.log(err))}
  console.log(currentWeather)
  console.log(forecast)
  return (
    <div className="App">
      <Search onSearchChange={handelOnSearchChange} />
      {currentWeather && < CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast}/>}
    </div>
    
  );
}

export default App;
