const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

url = process.env.MONGODB_URL

console.log(`Connecting to ${url}`)

mongoose.connect(url).then(
    console.log('Connected to MongoDB')
).catch((error) => {
    console.log(`error connecting to MONGODB: ${error.message}`)
})

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)