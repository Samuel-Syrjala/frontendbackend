const mongoose = require('mongoose')
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]


const url = `mongodb+srv://fullstack:${password}@cluster0.mmzqq11.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    Name: String,
    Number: String,
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

if (process.argv.length === 3) {
    printAllAndClose()
} else {
    const person = new Person({ Name: name, Number: number })
    person.save()
        .then(result => {
            console.log(`Added ${name} number ${number} to phonebook!`)
        })
        .finally(() => mongoose.connection.close())
}

