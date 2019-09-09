const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

// URL schema
let userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    }
})

let User = mongoose.model('user', userSchema) // Compile schema into model

router.post('/api/exercise/new-user', (req, res) => {
    // create new user document
    let user = new User();
    user.userName = req.body.username

    user.save((err) => {
        if (err) {
            console.log(err)
            return;
        } else {
            console.log('New user created')
            res.sendFile(__dirname + '/views/user-created.html')
        }
    })

})

module.exports = router;