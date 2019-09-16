const express = require('express')
const router = express.Router()
const multer = require('multer')
let upload = multer({ dest: 'uploads/' })

router.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    res.json({name: req.file.originalname, 
              type: req.file.mimetype,
              size: req.file.size + " bytes"})
})

module.exports = router