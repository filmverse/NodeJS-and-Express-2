const NoteForm = ({ addNote, newNote, handleChange }) => {
    return (
        <div>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleChange} />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default NoteForm;