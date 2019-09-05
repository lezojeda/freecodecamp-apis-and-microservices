const express = require('express')
const bodyParser = require('body-parser')
const timeparser = require('./timestamp.js')
const reqHeaderParser = require('./req-header-parser.js')
const urlShortener = require('./url-shortener.js')

let app = express();

// Serve static assets please and get me that sweet CSS OH GOD

app.use(express.static(__dirname + '/public'))

// Home route handler

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

// Timestamp microservice
app.use('/', timeparser)

// Request Header Parser

app.use('/', reqHeaderParser)

// URL shortener

// app.use('/', urlShortener)

const PORT = 5000

app.listen(PORT, ()=> console.log(`Server running at ${PORT}`));