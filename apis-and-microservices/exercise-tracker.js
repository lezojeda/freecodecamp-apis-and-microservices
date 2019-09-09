const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

// URL schema
let userSchema = mongoose.Schema({
    userName : {
        type: String,
        required: true
    }
})

let User = mongoose.model('user', userSchema) // Compile schema into model

router.post('/api/exercise/new-user', (req, res) => {
    // create new user document
    console.log("post new user route handled")
    let user = new User();
    try {
        res.sendFile(__dirname + '/views/user-created.html')
    } catch(error) {
        console.log(error)
        return;
    }
})

module.exports = router;