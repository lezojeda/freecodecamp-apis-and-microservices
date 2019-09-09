const express = require('express')
const bodyParser = require('body-parser')
const timeparser = require('./timestamp.js')
const reqHeaderParser = require('./req-header-parser.js')
const urlShortener = require('./url-shortener.js')
const mongoose = require('mongoose')

// Connect to database
mongoose.connect('mongodb+srv://lezojeda:winninggjob@cluster0-vjnrf.mongodb.net/fcc-apis-and-microservices?retryWrites=true&w=majority')

let db = mongoose.connection

// Check connection
db.once('open', function(err) {
    console.log('Connected to MongoDB')
})

// Check for db errors
db.on('error', function(err) {
    console.log(err)
});

let app = express();

// Serve static assets please and get me that sweet CSS OH GOD

app.use(express.static(__dirname + '/public'))

// Home route handler

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

// Exercise tracker

app.get('/exercise-tracker', (req, res) => {
    res.sendFile(__dirname + '/views/exercise-tracker.html')
})

// Timestamp microservice
app.use('/', timeparser)

// Request Header Parser

app.use('/', reqHeaderParser)

// URL shortener

app.use('/', urlShortener)

// app.use('/', urlShortener)

const PORT = 5000

app.listen(PORT, ()=> console.log(`Server running at ${PORT}`));