import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";

const App = () => {

  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState("")
  const [ showAll, setShowAll ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)

  const hook = () => {
    axios.get('http://localhost:3001/notes').then(
      response => {
        console.log(response.data)
        setNotes(response.data)
      }
    )
  }
  useEffect(hook, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteAdd = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    axios.post('http://localhost:3001/notes', noteAdd).then(
      response => {
        setNotes(notes.concat(response.data))
        setNewNote("")
        setSuccessMessage(`Note: "${noteAdd.content}" is added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    )
  }

  const noteToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const toggleImportant = (id) => () => {
    const note = notes.find(n => n.id === id)
    const changeNote = {...note, important: !note.important}
    axios.put(`http://localhost:3001/notes/${id}`, changeNote).then(
      response => {
        setNotes(notes.map(note => note.id !== id ? note : response.data))
      }
    )
    .catch(
      error => {
        setErrorMessage(`Note ${note.content} was already removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      }
    )
  }

  const removeNote = (id) => () => {
    axios.delete(`http://localhost:3001/notes/${id}`).then(
      () => {
        setNotes(notes.filter(note => note.id !== id))
      }
    )
    .catch(
      error => {
        setErrorMessage(`Note of ID ${id} was already removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      }
    )
  }

  const handleChange = (setValue) => (event) => {setValue(event.target.value)}

  const FailedNotification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const SuccessNotification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <FailedNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <Note notes={noteToShow} removeNote={removeNote} toggleImportant={toggleImportant} />
      <NoteForm
        addNote={addNote}
        newNote={newNote}
        handleChange={handleChange(setNewNote)}
      />
      Debug: {newNote}
    </div>
  )
}

export default App;