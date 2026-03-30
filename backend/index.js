require('dotenv').config({ path: './backend/.env' })
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, { family: 4 })
    .then(() => console.log('connected to MongoDB'))

const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const path = require('path')
const Person = require('./models/person')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))

app.get('/api/persons', (req, res) => {
    Person.getAll()
        .then(persons => res.json(persons))
})

/*
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    response.json(Person.printPersonAndClose(id))
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})


const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => Number(n.id)))
        : 0
    return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {

    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const nameExists = persons.some(p => p.name === body.name)

    if (nameExists) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})


app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
         <p>${new Date()}</p>`
    )
})

app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})
*/

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})