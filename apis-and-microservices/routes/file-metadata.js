const express = require('express')
const router = express.Router()
const multer = require('multer')
let upload = multer({ dest: 'uploads/' })

router.post('/api/fileanalyse', (req, res) => {

})

module.exports = router