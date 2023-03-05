import { useState, useEffect } from 'react';
import Book from './services/Book';
import Person from './components/Person';

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [query, setQuery] = useState("")

  const hook = () => {
    Book.getAll().then(
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
      Book.update(findPerson.id, newPerson).then(
        response => {
          setPersons(persons.map(person => person.id !== findPerson.id ? person : response.data))
          setNewName("")
          setNewNumber("")
        }
      )
    } else{
      Book.create(newPerson).then(
        response => {
          setPersons(persons.concat(response.data))
          setNewName("")
          setNewNumber("")
        }
      )
    }
    }

    const removePerson = (id) => () => {
      Book.remove(id).then(
        () => {
          setPersons(persons.filter(person => person.id !== id))
        }
      )
    }

  const handleChange = (setValue) => (event) => setValue(event.target.value.toLowerCase())

  return (
    <div>
      <h1>Phonebook</h1>
      filter shown with: <input value={query} onChange={handleChange(setQuery)} />
      <h3>add a new</h3>
      <form onSubmit={addPerson}>
        name:<input value={newName} onChange={handleChange(setNewName)} /><br />
        number:<input value={newNumber} onChange={handleChange(setNewNumber)} /><br />
        <button type='submit'>add</button>
      </form>
      {persons.filter(person => person.name.toLowerCase().includes(query)).map(person => <Person key={person.id} person={person} removePerson={removePerson} />)}
      debuging name: {newName}<br />
      debuging number: {newNumber}<br />
      debuging query: {query}
    </div>
  )
}

export default App;