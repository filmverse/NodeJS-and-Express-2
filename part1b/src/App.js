import { useState, useEffect } from 'react';
import axios from 'axios';
import Person from './components/Person';

const App = () => {

  const [persons, setPersons] = useState([])

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(
      response => {
        console.log(response.data)
        setPersons(response.data)
      }
    )
  }
  useEffect(hook, [])

  return (
    <div>
      <h1>Phonebook</h1>
      {persons.map(person => <Person key={person.id} person={person} />)}
    </div>
  )
}

export default App;