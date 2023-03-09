const Person = ({ persons, removePerson, query }) => {
    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase())).map(person => <ul key={person.id}>
                <li>
                    {person.name}:{person.number} <button onClick={removePerson(person.id, person.name)}>delete</button>
                </li>
            </ul>)}
        </div>
    )
}
export default Person;