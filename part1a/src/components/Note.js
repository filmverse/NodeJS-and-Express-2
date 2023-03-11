const Note = ({ notes, removeNote, toggleImportant }) => {

    const label = (obj) => obj.important
        ? 'make not important'
        : 'make important'

    return (
        <div>
            {notes.map(note =>
                <ul key={note.id}>
                    <li>{note.content} <button onClick={toggleImportant(note.id)}>{label(note)}</button><button onClick={removeNote(note.id)}>delete?</button></li>
                </ul>
            )}
        </div>
    )
}

export default Note;