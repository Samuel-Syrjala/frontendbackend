const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
})

module.exports = mongoose.model('Person', personSchema)

if (require.main === module) {
    require('dotenv').config({ path: './backend/.env' })
    const mongoose = require('mongoose')
    mongoose.connect(process.env.MONGODB_URI, { family: 4 })
        .then(() => {
            const name = process.argv[2]
            const number = process.argv[3]

            if (!name && !number) {
                module.exports.find({}).then(persons => {
                    console.log('All entries:')
                    persons.forEach(p => console.log(`${p.name} : ${p.number}`))
                }).finally(() => mongoose.connection.close())
            } else {
                const Person = module.exports
                const person = new Person({ name, number, id: Math.random() })
                person.save()
                    .then(() => console.log(`Added ${name} number ${number} to phonebook!`))
                    .finally(() => mongoose.connection.close())
            }
        })
        .catch(err => {
            console.error('error connecting to MongoDB:', err.message)
            process.exit(1)
        })
}