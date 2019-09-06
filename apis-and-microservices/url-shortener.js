const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: false}))

router.use(bodyParser.json())

router.post('/api/shorturl/new', (req, res) => {
    console.log(req.body)
    res.json( {longurl : req.body})
})

module.exports = router;