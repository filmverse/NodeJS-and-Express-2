import { useState, useEffect } from "react";
import axios from "axios";
import Details from "./components/Details";

const baseUrl = "https://restcountries.com/v3.1/all"

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ query, setQuery ] = useState("")

  const hook = () => {
    axios.get(baseUrl).then(
      response => {
        console.log(response.data);
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

  const handleChange = (setValue) => (event) => {setValue(event.target.value)}

  return (
    <div>
      Find Country<input value={query} onChange={handleChange(setQuery)} />
      <Details countries={countries} />
    </div>
  )
}

export default App;