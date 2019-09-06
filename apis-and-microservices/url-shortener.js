const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const dns = require('dns');
const mongoose = require('mongoose')

// URL schema
let urlSchema = mongoose.Schema({
    long_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true
    }
})

let Url = mongoose.model('URL', urlSchema, 'url-shortener')

// Routes
router.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json())

router.post('/api/shorturl/new', (req, res) => {
    const remove_https = /(^http(s)?:\/\/)/i
    const remove_final_dash = /(\/)$/
    const longurl = req.body.longurl.replace(remove_https, '').replace(remove_final_dash, '')
    
    dns.lookup(longurl, (err) => {
        if (err) {
            console.log(longurl)
            return res.json({ "error": "invalid URL" })
        } else {
            let url = new Url();
            url.long_url = req.body.longurl
            url.short_url = req.body.longurl

            url.save((err) => {
                if(err) {
                    console.log(err)
                    return;
                } else {
                    console.log("url added")
                    res.json({
                        "long_url (requested)": req.body.longurl,
                        "short_url": req.body.longurl
                    })
                    return;

                }
            })

        }
    })
})

module.exports = router;