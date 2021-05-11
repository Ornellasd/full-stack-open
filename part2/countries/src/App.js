import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Display = ({ countriesToShow, setSearchTerm }) => {
  if(countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if(countriesToShow.length === 1) {
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