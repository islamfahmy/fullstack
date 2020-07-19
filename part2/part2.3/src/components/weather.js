import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Weather = ({name}) => {
  const [weather, setWeather] = useState({location:{}, current: {}});
  const [loading, setLoading] = useState(true);
  const key = 'f55683b4720c495a9ac8f092f3f14555'
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${name}`

  useEffect(() => {
    axios.get(url)
    .then(response => {
      console.log('promise fullfilled')
      setLoading(false);
      setWeather(response.data)
    })
  }, [])

  return loading ? <p>Loading...</p> : (
    <div>
      <h1>Weather in {weather.location.name}</h1>
      <h2>temperature: {weather.current.temperature} </h2>
      <img src = {weather.current.weather_icons} />
      <h2>wind: {weather.current.wind_speed} kph direction {weather.current.wind_dir}</h2>
    </div>
  )
}
export default Weather
 