const express = require('express')
const router = express.Router()

router.get('/api/timestamp', (req, res) => {
    let date = new Date()
    res.json({'unix' : date.getTime(), 'utc' : date.toUTCString()})
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

module.exports = router;