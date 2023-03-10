import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

  const [ notes, setNotes ] = useState([])

  const hook = () => {
    axios.get('http://localhost:3001/notes').then(
      response => {
        console.log(response.data)
        setNotes(response.data)
      }
    )
  }
  useEffect(hook, [])

  return (
    <div>
      {notes.map(note => <p key={note.id}>{note.content}</p>)}
    </div>
  )
}

export default App;