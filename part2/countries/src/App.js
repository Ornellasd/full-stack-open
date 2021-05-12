import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DisplayCountryData = ({ country }) => { 
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => 
          <li>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} width="150" />
      <DisplayWeatherData country={country}/>
    </div>
  )
}

const DisplayWeatherData = ({ country }) => {
  const [weatherData, setWeatherData] = useState([])

  const fetchWeather = () => {
    const capital = country.capital.split(', ')
    console.log(capital)
    
    axios.get(`https://www.metaweather.com/api/location/search/?query=${capital[0]}`)
      .then(response => {
        axios.get(`https://www.metaweather.com/api/location/${response.data[0].woeid}`)
          .then(response => {
            console.log(response.data.consolidated_weather[0])
            setWeatherData(response.data.consolidated_weather[0])
          })
      })
  }

  useEffect(fetchWeather, [])
  
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <h3 style={{display: 'inline-block'}}>temperature:</h3> {Math.round(weatherData.the_temp)} celsius
      <img style={{display: 'block'}} src={`https://www.metaweather.com/static/img/weather/png/64/${weatherData.weather_state_abbr}.png`} />
      <h3 style={{display: 'inline-block'}}>wind:</h3> {Math.round(weatherData.wind_speed)} km/h direction {weatherData.wind_direction_compass}
    </div>
  )
}

const Display = ({ countriesToShow, setSearchTerm }) => {
  if(countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if(countriesToShow.length === 1) {
    return <DisplayCountryData country={countriesToShow[0]} />
  } else {
    return (
      <div>
        {countriesToShow.map(country =>
          <div>
            {country.name} <button onClick={() => setSearchTerm(country.name.toLowerCase())}>show</button>
          </div>
        )}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState([''])

  const fetchCountries = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(fetchCountries, [])

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const countriesToShow = countries.filter(country => {
    return country.name.toLowerCase().includes(searchTerm)
  })
  
  return (
    <div>
      
        <div>
          find countries <input onChange={handleFilterChange} />
        </div>
     
      <Display countriesToShow={countriesToShow} setSearchTerm={setSearchTerm} />
    </div>
  )
}

export default App