import { useState, useEffect } from "react";
import axios from "axios";
import Details from "./components/Details";

const baseUrl = "https://restcountries.com/v3.1/all"

const App = () => {

  const [ countries, setCountries ] = useState([])

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

  return (
    <div>
      <Details countries={countries} />
    </div>
  )
}

export default App;