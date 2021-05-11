import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Display = ({ countriesToShow, setSearchTerm }) => {
  const [weather, setWeather] = useState([])

  const fetchWeather = (city) => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  }

  if(countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if(countriesToShow.length === 1) {
    // hide search box to limit api calls
    //fetchWeather(countriesToShow[0].capital)

    return (
      <div>
        <h1>{countriesToShow[0].name}</h1>
        <p>capital {countriesToShow[0].capital}</p>
        <p>population {countriesToShow[0].population}</p>
        <h2>languages</h2>
        <ul>
          {countriesToShow[0].languages.map(language => 
            <li>{language.name}</li>
          )}
        </ul>
        <img src={countriesToShow[0].flag} width="150" />
        <h2>Weather in {countriesToShow[0].capital}</h2>
        <h3>temperature:</h3>
        <img src="http://openweathermap.org/img/wn/03n@2x.png" />
        <h3>wind:</h3>
      </div>
    )
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
      find countries <input onChange={handleFilterChange} />
      <Display countriesToShow={countriesToShow} setSearchTerm={setSearchTerm} />
    </div>
  )
}

export default App