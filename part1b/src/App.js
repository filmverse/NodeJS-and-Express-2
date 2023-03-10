import { useState, useEffect } from 'react';
import Book from './services/Book';
import Person from './components/Person';
import PersonForm from './components/PersonForm';

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [query, setQuery] = useState("")

  const hook = () => {
    Book.getAll().then(
      response => {
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
    const findPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    if (findPerson) {
      if (window.confirm(`"${newName}" is already added to phonebook, replace the old number with a new one ?`)) {
        Book.update(findPerson.id, newPerson).then(
          response => {
            setPersons(persons.map(person => person.id !== findPerson.id ? person : response.data))
            setNewName("")
            setNewNumber("")
          }
        )
      }
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

    const removePerson = (id, name) => () => {
      if (window.confirm(`Delete "${name}"?`)) {
        Book.remove(id).then(
          () => {
            setPersons(persons.filter(person => person.id !== id))
          }
        ).catch(error => {
          alert(`"${name}" was already removed from the server`)
          setPersons(persons.filter(person => person.id !== id))
        })
      }
    }

  const handleChange = (setValue) => (event) => setValue(event.target.value)

  return (
    <div>
      <h1>Phonebook</h1>
      filter shown with: <input value={query} onChange={handleChange(setQuery)} />
      <p>add a new</p>
      <PersonForm
        addPerson={addPerson}
        name={newName}
        number={newNumber}
        changeName={handleChange(setNewName)}
        changeNumber={handleChange(setNewNumber)}
      />
      <Person
        persons={persons}
        removePerson={removePerson}
        query={query}
      />

      debuging name: {newName}<br />
      debuging number: {newNumber}<br />
      debuging query: {query}
    </div>
  )
}

export default App;