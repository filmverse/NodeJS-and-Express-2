require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.static('build'))
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

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/info', (request, response) => {
    const infoMessage = `<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`
    response.send(infoMessage)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})
 
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id).then(result => {
        return response.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({error: "name or number is missing"})
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    Person.findOne({ name: body.name }).then((result) => {
        if (result) {
            return response.status(400).json({ error: `${body.name} already exists in the database` })
        } else {
            person.save().then(savedPerson => {
                response.json(savedPerson)
            }).catch(error => next(error))
        }
    }).catch(error => next(error))
})

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})