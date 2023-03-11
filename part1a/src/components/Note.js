const Note = ({ notes, removeNote }) => {
    return (
        <div>
            {notes.map(note =>
                <ul key={note.id}>
                    <li>{note.content} <button>make important?</button><button onClick={removeNote(note.id)}>delete?</button></li>
                </ul>
            )}
        </div>
    )
}

export default Note;