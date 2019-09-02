const express = require('express')
const bodyParser = require('body-parser')

app = express();

app.get("/api/timestamp/:date_string?", (req, res) => {
    let timestamp = Date.parse(req.params.date_string)
    if(!isNaN(timestamp)) {
        let date = new Date(timestamp)
        res.json({'utc' : date.toUTCString()})
    } else {
        res.send("Invalid date")
    }
})

const PORT = 3000

app.listen(PORT, ()=> console.log(`Server running at ${PORT}`));