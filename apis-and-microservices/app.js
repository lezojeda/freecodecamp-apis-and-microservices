const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const timeparser = require('./routes/timestamp.js')
const reqHeaderParser = require('./routes/req-header-parser.js')
const urlShortener = require('./routes/url-shortener.js')
const exerciseTracker = require('./routes/exercise-tracker.js')

// Connect to database
mongoose.connect('mongodb+srv://lezojeda:TCojYiuBTQdM9SsP@cluster0-vjnrf.mongodb.net/fcc-apis-and-microservices?retryWrites=true&w=majority')

let db = mongoose.connection

// Check connection
db.once('open', function(err) {
    console.log('Connected to MongoDB')
})

// Check for db errors
db.on(' error', function(err) {
    console.log(err)
});

let app = express();

// Serve static assets

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

// Exercise tracker

app.use('/', exerciseTracker)

app.use(function (err, req, res, next) {
    res.status(404).sendFile(__dirname + '/views/404.html')
  })

const PORT = 5000

app.listen(PORT, ()=> console.log(`Server running at ${PORT}`));