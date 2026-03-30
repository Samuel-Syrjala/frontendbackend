const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    Name: String,
    Number: String,
    id: Number
})

personSchema.statics.getAll = function () {
    return this.find({})
}

module.exports = mongoose.model('Person', personSchema)
