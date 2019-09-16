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

let Url = mongoose.model('URL', urlSchema, 'url-shortener') //ultimo parametro la coleccion donde guardar

// Routes
router.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json())

router.post('/api/shorturl/new', (req, res) => {
    const remove_https = /(^http(s)?:\/\/)/i
    const remove_final_dash = /(\/)$/
    const contains_www = /^(w){3}\./g

    let longurl = req.body.longurl.replace(remove_https, '').replace(remove_final_dash, '') //remove https and trailing /

    let longurl_processed = !contains_www.test(longurl) ? 'www.' + longurl : longurl //add www if not there

    dns.lookup(longurl_processed, (err) => {
        if (err) {
            console.log(longurl_processed)
            return res.json({ "error": "invalid URL" })
        } else {
            let random_short_url = Math.floor(Math.random() * 500)

            let url = new Url();
            url.long_url = req.body.longurl
            url.short_url = random_short_url

            url.save((err) => {
                if (err) {
                    console.log(err)
                    return;
                } else {
                    console.log("Shortened URL in database")
                    res.json({
                        "long_url (requested)": longurl_processed,
                        "short_url": random_short_url
                    })
                    return;

                }
            })

        }
    })
})

// Redirect when short url GET request

router.get('/api/shorturl/:shorturl', (req, res) => {
    Url.findOne({ short_url: req.params.shorturl }, (err, doc) => {
        if (err) {
            res.send("Some error happened, sorry mate")
        } else if (doc == null){
            res.send("No such short url in the database")
        } else {
            res.redirect(doc.long_url)        
        }
    })
})

module.exports = router;