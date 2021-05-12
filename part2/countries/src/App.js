import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DisplayCountryData = ({ country }) => { 
  return (
    <div>
      <h1>{country.name}</h1><a href="">back</a>
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
  }

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <h3>temperature:</h3>
      <img src="http://openweathermap.org/img/wn/03n@2x.png" />
      <h3>wind:</h3>
    </div>
  )
}

const Display = ({ countriesToShow, setSearchTerm, setShowSearch }) => {
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
  const [showSearch, setShowSearch] = useState(true)

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
      {showSearch ?
        <div>
          find countries <input onChange={handleFilterChange} />
        </div>
      : null}
      <Display countriesToShow={countriesToShow} setSearchTerm={setSearchTerm} setShowSearch={setShowSearch} />
    </div>
  )
}

export default App