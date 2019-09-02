const express = require('express')
const bodyParser = require('body-parser')

app = express();

app.get('/api/timestamp/', (req, res) => {
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

const PORT = 3000

app.listen(PORT, ()=> console.log(`Server running at ${PORT}`));