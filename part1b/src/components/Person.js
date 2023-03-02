const Person = ({ person }) => {
    return (
        <div>
            <ul>
                <li>{person.name}: {person.number}</li>
            </ul>
        </div>
    )
}

export default Person;