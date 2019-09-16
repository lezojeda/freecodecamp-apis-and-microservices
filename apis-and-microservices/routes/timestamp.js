const express = require('express')
const router = express.Router()

router.get('/api/timestamp', (req, res) => {
    let date = new Date()
    // first check if query is empty
    if(Object.entries(req.query).length === 0 && req.query.constructor === Object) {
        res.json({'unix' : date.getTime(), 'utc' : date.toUTCString()})
    } else {
        let timestamp = new Date(req.query.year + "-" + req.query.month + "-" + req.query.day)
        console.log(timestamp)
        // res.send(req.query)
        res.json({'unix' : timestamp.getTime(),'utc' : timestamp.toUTCString()}) 
    }
})

router.get('/api/timestamp/:date_string?', (req, res) => {
    let timestamp = Date.parse(req.params.date_string)
    if(!isNaN(timestamp)) {
        let date = new Date(req.params.date_string)
        res.json({'unix' : date.getTime(), 'utc' : date.toUTCString()})
    } else {
        res.json({'error' : 'Invalid Date'})
    }
})

router.get('/api/timestamp/', (req, res) => {
    res.send(req.query)
})

module.exports = router;