import { useState, useEffect } from "react";
import axios from "axios";
import Details from "./components/Details";
import Detail from "./components/Detail";

const baseUrl = "https://restcountries.com/v3.1/all"

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ query, setQuery ] = useState("")

  const hook = () => {
    axios.get(baseUrl).then(
      response => {
        setCountries(response.data.map(
          country => ({
            name: country.name.common,
            capital: country.capital,
            area: country.area,
            language: country.languages,
            flag: country.flag,
            flags: country.flags
          })
        ))
      }
    )
  }
  useEffect(hook, [])

  const filterCountry = countries.filter(
    country => country.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleChange = (setValue) => (event) => {setValue(event.target.value)}

  return (
    <div>
      <p>Find Country<input value={query} onChange={handleChange(setQuery)} /></p>
      {filterCountry.length > 10 && (
        <p>Too many matches, Specify another filter</p>
      )}
      {filterCountry.length <= 10 && filterCountry.length > 1 && filterCountry.map(fcountry => (
        <ul key={fcountry.name}>
          <li>{fcountry.name}</li>
        </ul>
      ))}
      {filterCountry.length === 1 && (
        <Detail country={filterCountry[0]} />
      )}
      <Details countries={countries} />
    </div>
  )
}

export default App;