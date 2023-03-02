import { useState, useEffect } from 'react';
import axios from 'axios';
import Person from './components/Person';

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(
      response => {
        console.log(response.data)
        setPersons(response.data)
      }
    )
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const findPerson = persons.find(person => person.name === newName)
    if (findPerson) {
      axios.put(`http://localhost:3001/persons/${findPerson.id}`, newPerson).then(
        response => {
          setPersons(persons.map(person => person.id !== findPerson.id ? person : response.data))
          setNewName("")
          setNewNumber("")
        }
      )
    } else{
      axios.post('http://localhost:3001/persons', newPerson).then(
        response => {
          setPersons(persons.concat(response.data))
          setNewName("")
          setNewNumber("")
        }
      )
    }
    }

  const handleChange = (setValue) => (event) => setValue(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      <h3>add a new</h3>
      <form onSubmit={addPerson}>
        name:<input value={newName} onChange={handleChange(setNewName)} /><br />
        number:<input value={newNumber} onChange={handleChange(setNewNumber)} /><br />
        <button type='submit'>add</button>
      </form>
      {persons.map(person => <Person key={person.id} person={person} />)}
      debuging name: {newName}<br />
      debuging number: {newNumber}
    </div>
  )
}

export default App;