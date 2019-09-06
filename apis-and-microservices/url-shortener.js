const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: false}))

router.post('/api/shorturl/new', (req, res) => {
    res.send("Hola amigos")
})

module.exports = router;