const express = require('express')
const router = express.Router()

router.get('/api/whoami', (req, res) => {
    let reqData = req.connection.remoteAddress
    let userLanguage = req.headers["accept-language"]
    let userSystemInfo = req.headers["user-agent"]
    
    res.json({"ip address" : reqData.substring(7),
             "language" : userLanguage,
             "software": userSystemInfo})
  })

module.exports = router;