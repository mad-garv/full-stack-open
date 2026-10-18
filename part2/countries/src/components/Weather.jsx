import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    if (!capital) return

    setWeather(null)

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.error('Error fetching the weather data:', error)
      })
  }, [capital, apiKey])

  if (!weather) {
    return <p>Loading weather data...</p>
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p><strong>temperature:</strong> {weather.main.temp} Celsius</p>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <p><strong>wind:</strong> {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
