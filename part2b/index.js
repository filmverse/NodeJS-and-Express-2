const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('body', (request, response) => request.method === 'POST' ? JSON.stringify(request.body) : '')
app.use(morgan((tokens, request, response) => {
    return [
        tokens.method(request, response),
        tokens.url(request, response),
        tokens.status(request, response),
        tokens.res(request, response, 'content-length'),
        '-',
        tokens['response-time'](request, response),
        'ms',
        tokens.body(request, response),
    ].join(' ')
}))

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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const responseInfo = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
    response.send(responseInfo)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => Math.floor(Math.random() * (1000000 - 4 + 1) + 4)

app.post('/api/persons', (request, response) => {
    const body = request.body
    const findPerson = persons.find(person => person.name.toLowerCase() === request.body.name?.toLowerCase())
    if (!body.name || !body.number) {
        response.status(400).json({
            error: "The name or number is missing"
        })
    } else if (findPerson) {
        response.status(400).json({
            error: "name must be unique"
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
    console.log(`server running on port ${PORT}`)
})
