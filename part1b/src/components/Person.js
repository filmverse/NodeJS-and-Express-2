const Person = ({ persons, removePerson, query }) => {
    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(query)).map(person => <ul key={person.id}>
                <li>{person.name}:{person.number} <button onClick={removePerson(person.id)}>delete</button></li>
            </ul>)}
        </div>
    )
}
export default Person;