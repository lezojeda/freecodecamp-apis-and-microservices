const express = require('express')
const router = express.Router() //Router instance
const mongoose = require('mongoose')

// Create New User

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    }
})

let User = mongoose.model('user', userSchema, 'users') // Compile schema into model

router.post('/api/exercise/new-user', (req, res) => {
    User.findOne({ username: req.body.username }, (err, doc) => {
        if (err) {
            console.log(err)
        } else if (doc !== null) {
            res.send("Username already taken")
        } else { // create new user document
            let user = new User();
            user.username = req.body.username

            user.save((err) => {
                if (err) {
                    console.log(err)
                    return;
                } else {
                    console.log('New user created')
                    res.sendFile(__dirname + '/views/user-created.html')
                }
            })

        }
    })

})

// Add exercises

let exerciseSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: false
    }
})

let Exercise = mongoose.model('exercise', exerciseSchema, 'exercises')

router.post('/api/exercise/add', (req, res) => {
    User.findOne({ username: req.body.username }, (err, doc) => {
        if (err) {
            console.log("error at findOne")
            console.log("err")
            return;
        } else if (doc == null) {
            console.log("Username validation error")
            res.send("No such username, please try again")
        } else {
            let exercise = new Exercise()
            exercise.username = req.body.username
            exercise.description = req.body.description
            exercise.duration = req.body.duration
            exercise.date = req.body.date

            exercise.save((err) => {
                if (err) {
                    console.log(err)
                    return;
                } else {
                    console.log('Exercise added')
                    res.send("Exercise added")
                }
            })
        }
    })
})

// Get users's exercise log

router.get('/api/exercise/log', (req, res) => {
    Exercise.find({ username: req.query.username,
                    date: {"$gte" : req.query.from, "$lt" : req.query.to} }, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            res.send(doc)
        }
    }).limit(parseInt(req.query.limit))
})

module.exports = router;