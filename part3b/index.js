const express = require('express')

const app = express()

app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/info', (request, response) => {
    const infoMessage = `<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`
    response.send(infoMessage)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})
 
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => Math.floor(Math.random() * (1000000 - 4 + 1) + 4)

app.post('/api/persons', (request, response) => {
    const body = request.body
    const findPerson = persons.find(person => person.name === body.name)
    if (!body.name || !body.number) {
        response.status(400).json({
            error: 'The name or number is missing'
        })
    } else if (findPerson) {
        response.status(400).json({
            error: 'name must be unique'
        })
    } else {
        const person = {
            name: body.name,
            number: body.number,
            id: generateId(),
        }
        persons = persons.concat(person)
        response.json(person)
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})