import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/all"

const App = () => {

  const [ countries, setCountries ] = useState([])

  const hook = () => {
    axios.get(baseUrl).then(
      response => {
        console.log(response.data)
        setCountries(response.data)
      }
    )
  }
  useEffect(hook, [])

  return (
    <div>
      Hello World
    </div>
  )
}

export default App;