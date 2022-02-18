// run w/ node server.js localhost:5000/app

const express = require('express')
const app = express()

var port = require('minimist')(process.argv.slice(2))

const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

app.use(function(req, res) {
    // send turns text into html
    // end keeps the text as plaintext
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})
