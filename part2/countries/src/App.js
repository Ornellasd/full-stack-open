import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Display = ({ countriesToShow }) => {
  if(countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else {
    return (
      <div>
        {countriesToShow.map(country =>
          <p>{country.name}</p> 
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

  const countriesToShow = countries.filter(country => {
    return country.name.toLowerCase().includes(searchTerm)
  })
  
  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  /*
  <div>
      find countries <input onChange={handleFilterChange} />
      {if(countriesToShow.length > 10) {
        return <p></p>
      }}
      {countriesToShow.map(country =>
        <p>{country.name}</p> 
      )}
    </div>
    */

  return (
    <div>
      find countries <input onChange={handleFilterChange} />
      <Display countriesToShow={countriesToShow} />
    </div>
  )
}

export default App