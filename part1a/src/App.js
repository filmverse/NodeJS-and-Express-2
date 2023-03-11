import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";

const App = () => {

  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState("")
  const [ showAll, setShowAll ] = useState(true)

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
      }
    )
  }

  const noteToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const removeNote = (id) => () => {
    axios.delete(`http://localhost:3001/notes/${id}`).then(
      () => {
        setNotes(notes.filter(note => note.id !== id))
      }
    )
  }

  const handleChange = (setValue) => (event) => {setValue(event.target.value)}

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <Note notes={noteToShow} removeNote={removeNote} />
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