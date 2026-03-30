require('dotenv').config({ path: './backend/.env' })
const mongoose = require('mongoose')
const name = process.argv[3]
const number = process.argv[4]


const url = process.env.MONGODB_URI
console.log(url)
mongoose.connect(url, { family: 4 })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    Name: String,
    Number: String,
    id: Number
})

const Person = mongoose.model('Person', personSchema)

function printAllAndClose() {
    Person.find({})
        .then(persons => {
            console.log('All entries in phoneBookApp -> people:')
            persons.forEach(p => console.log(`${p.Name} : ${p.Number}`))
        })
        .finally(() => mongoose.connection.close())
}

Person.getAll = function() {
    return Person.find({})
}

function printPersonAndClose(id) {
    Person.find({ id: id })
        .then(persons => {
            if (persons.length === 0) {
                console.log(`No person found with id: ${id}`)
            } else {
                persons.forEach(p => console.log(`${p.id} : ${p.name}, ${p.Number}`))
            }
        })
        .finally(() => mongoose.connection.close())
}

if (process.argv.length === 3) {
    printAllAndClose()
} else {
    const person = new Person({ Name: name, Number: number, id: Math.random() })
    person.save()
        .then(result => {
            console.log(`Added ${name} number ${number} to phonebook!`)
        })
        .finally(() => mongoose.connection.close())
}


module.exports = mongoose.model('Person', personSchema)