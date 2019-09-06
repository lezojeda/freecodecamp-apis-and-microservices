const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const dns = require('dns');

router.use(bodyParser.urlencoded({extended: false}))

router.use(bodyParser.json())

router.post('/api/shorturl/new', (req, res) => {
    const remove_https = /^https?:\/\//i
    const longurl = req.body.longurl.replace(remove_https, '')
    dns.lookup(longurl, (err) => {
            if(err) {
                res.json({"error" : "invalid URL"})
            }
        })
    res.json({"Your requested URL" : req.body.longurl})
})

module.exports = router;