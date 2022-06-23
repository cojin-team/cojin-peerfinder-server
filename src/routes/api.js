var router = require('express').Router()
//var bodyParser = require('body-parser')

//router.use(bodyParser.json())
//for some reason bodyParser can't parse json, ironic

router.get('/ping', (req, res) => {
    res.send('pong').end()
})

router.get('/getpeers', (req, res) => {
    res.json([]) // send a list with top 10 peers in the database
})

router.post('/postpeer/:peer', (req, res) => {
    // save the peer in the database
    res.sendStatus(200).end()
})

module.exports = router
