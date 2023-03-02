const Person = ({ person }) => {
    return (
        <div>
            <ul>
                <li>name: {person.name}</li>
                <li>number: {person.number}</li>
            </ul>
        </div>
    )
}

export default Person;