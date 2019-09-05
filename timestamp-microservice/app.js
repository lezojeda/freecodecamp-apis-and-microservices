const express = require('express')
const bodyParser = require('body-parser')

app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

// Timestamp microservice

app.get('/api/timestamp', (req, res) => {
    let date = new Date()
    res.json({'unix' : date.getTime(), 'utc' : date.toUTCString()})
})

app.get('/api/timestamp/:date_string?', (req, res) => {
    let timestamp = Date.parse(req.params.date_string)
    if(!isNaN(timestamp)) {
        let date = new Date(req.params.date_string)
        res.json({'unix' : date.getTime(), 'utc' : date.toUTCString()})
    } else {
        res.json({'error' : 'Invalid Date'})
    }
})

// Request Header Parser

app.get('/api/whoami', (req, res) => {
  let reqData = req.connection.remoteAddress
  let userLanguage = req.headers["accept-language"]
  let userSystemInfo = req.headers["user-agent"]
  
  res.json({"ip adress" : reqData.substring(7),
           "language" : userLanguage,
           "software": userSystemInfo})
})

const PORT = 5500

app.listen(PORT, ()=> console.log(`Server running at ${PORT}`));