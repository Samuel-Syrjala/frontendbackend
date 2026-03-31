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

app.get('/api/persons', async (req, res, next) => {
    try {
        const persons = await Person.find({})
        res.json(persons)
    } catch (err) {
        next(err)
    }
})

app.post('/api/persons', async (req, res, next) => {
    try {
        const { name, number } = req.body

        if (!name) return res.status(400).json({ error: 'name missing' })
        if (!number) return res.status(400).json({ error: 'number missing' })

        const person = new Person({ name, number })
        const saved = await person.save()

        res.status(201).json(saved)
    } catch (err) {
        next(err)
    }
})

app.delete('/api/persons/:id', async(req, res, next) => {
    try {
        const id = req.params.id
        const deleted = await Person.findByIdAndDelete(id)

        if (!deleted) return res.status(404).json({ error: 'person not found' })

        return res.status(204).end()
    } catch (err) {
        next(err)
    }
})


    /*
    app.get('/api/persons/:id', (request, response) => {
        const id = request.params.id
        response.json(Person.printPersonAndClose(id))
    })



    const generateId = () => {
        const maxId = persons.length > 0
            ? Math.max(...persons.map(n => Number(n.id)))
            : 0
        return String(maxId + 1)
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
