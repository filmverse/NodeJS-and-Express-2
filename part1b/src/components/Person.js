const Person = ({ person, removePerson }) => {
    return (
        <div>
            <ul>
                <li>{person.name}: {person.number} <button onClick={removePerson(person.id)}>delete</button></li>
            </ul>
        </div>
    )
}

export default Person;