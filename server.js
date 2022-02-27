// run w/ node server.js localhost:5000/app
// OR run the server in one terminal
// use ANOTHER terminal and curl to interact w/ server

const express = require('express')
const app = express()

var args = require('minimist')(process.argv.slice(2))

if (args['port'] === undefined) {
    port = 5000
} else {
    port = args['port']
}

const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

/*
    COIN FLIP FUNCTIONS
*/

function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
}

function flipACoin(call) {
    var flip = (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
    if (flip == call) {
        return {
        'call': call,
        'flip': flip,
        'result': 'win'
        }
    } else {
        return {
        'call': call,
        'flip': flip,
        'result': 'lose'
        }
    }
}

function coinFlips(flips) {
    var a = []
    for (let i = 0; i < flips; i++) {
      a[i] = (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
    }
    return a;
}
  
  /** Count multiple flips
   * 
   * Write a function that accepts an array consisting of "heads" or "tails" 
   * (e.g. the results of your `coinFlips()` function) and counts each, returning 
   * an object containing the number of each.
   * 
   * example: conutFlips(['heads', 'heads','heads', 'tails','heads', 'tails','tails', 'heads','tails', 'heads'])
   * { tails: 5, heads: 5 }
   * 
   * @param {string[]} array 
   * @returns {{ heads: number, tails: number }}
   */
  
function countFlips(array) {
    var tCounter = 0
    var hCounter = 0
    for (let i = 0; i < array.length; i++) {
      if (array[i] == 'heads') {
        hCounter++
      } else {
        tCounter++
      }
    }
  
    if (tCounter === 0) {
      return {
        'heads': hCounter
      }
    } else if (hCounter === 0) {
      return {
        'tails': tCounter
      }
    } else {
      return {
        'tails': tCounter,
        'heads': hCounter
      }
    }
}

/*
    END FLIP FUNCS
*/

// default endpoint
app.get('/app', (req,res) => {
    res.status(200).end('OK')
    res.type('text/plain')
})

// allows you to go to that endpoint and replace :number with something else
app.get('/app/flips/:number', (req, res) => {
    flips_array = coinFlips(req.params.number)
    flips_summary = countFlips(flips_array)
    res.status(200).json({ 'raw': flips_array, 'summary': flips_summary })
})

app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.status(200).json({ 'flip': flip })
})

app.get('/app/flip/call/heads', (req, res) => {
    var flip = flipACoin('heads')
    res.status(200).json(flip)
})

app.get('/app/flip/call/tails', (req, res) => {
    var flip = flipACoin('tails')
    res.status(200).json(flip)
})

app.use(function(req, res) {
    // send turns text into html
    // end keeps the text as plaintext
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})
