const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://vkassharma19492:<password>@cluster0.paffoup.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteScheme = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const = Note = mongoose.model('Note', noteScheme)

const note = new Note({
    content: 'HTML is Easy',
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})