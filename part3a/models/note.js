const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

url = process.env.MONGODB_URL

console.log(`connecting to ${url}`)

mongoose.connect(url).then(
    console.log('Connected to MONGODB')
).catch((error) => {
    console.log(`error connecting to MONGODB: ${error.message}`)
})

const noteScheme = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true,
    },
    important: Boolean,
})

noteScheme.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteScheme)