import { useState, useEffect } from 'react'
import axios from "axios"
import Countries from './components/Countries'
import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => console.log('error fetching data:', error))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  const handleShowClick = (country) => {
    setSelectedCountry(country)
  }

  const countriesToShow = filter
    ? countries.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    )
    : [] 

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} handleShowClick={handleShowClick}/>
      {selectedCountry && (
        <Country country={selectedCountry} />
      )}
    </div>
  )
}

export default App