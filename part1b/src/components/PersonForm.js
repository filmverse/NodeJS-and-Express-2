const PersonForm = ({ name, number, changeName, changeNumber, addPerson }) => {
    return (
        <div>
            <form onSubmit={addPerson}>
                name:<input value={name} onChange={changeName} /><br />
                number:<input value={number} onChange={changeNumber} /><br />
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default PersonForm;