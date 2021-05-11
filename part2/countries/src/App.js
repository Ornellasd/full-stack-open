import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      find countries <input onChange={handleFilterChange} />
      {countries.map(country =>
        <p>{country.name}</p> 
      )}
    </div>
  )
}

export default App