// run w/ node server.js localhost:5000/app
// OR run the server in one terminal
// use ANOTHER terminal and curl to interact w/ server

const express = require('express')
const app = express()

// var port = require('minimist')(process.argv.slice(2))
var port = 5000

const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

// default endpoint
app.get('/app', (req,res) => {
    res.status(200).end('OK')
    res.type('text/plain')
})

// allows you to go to that endpoint and replace :number with something else
app.get('/app/echo/:number', (req, res) => {
    res.status(200).json({ 'message': req.params.number })
})

app.use(function(req, res) {
    // send turns text into html
    // end keeps the text as plaintext
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})
