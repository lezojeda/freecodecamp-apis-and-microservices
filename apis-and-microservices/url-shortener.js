const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const dns = require('dns');

router.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json())

router.post('/api/shorturl/new', (req, res) => {
    const remove_https = /(^http(s)?:\/\/)/i
    const remove_final_dash = /(\/)$/
    const longurl = "www." + req.body.longurl.replace(remove_https, '').replace(remove_final_dash, '')
    
    dns.lookup(longurl, (err) => {
        if (err) {
            return res.json({ "error": "invalid URL" })
        } else {
            res.json({
                "long_url (requested)": req.body.longurl,
                "short_url": req.body.longurl
            })
            return;
        }
    })
})

module.exports = router;