const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://vkassharma19492:${password}@cluster0.pq7j4si.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Phonebook = mongoose.model("Phonebook", phonebookSchema)

const contact = new Phonebook({
    name: process.argv[3],
    number: process.argv[4],
})

contact.save().then(result => {
    console.log(`added ${contact.name} number ${contact.number} to phonebook`)
    mongoose.connection.close()
})