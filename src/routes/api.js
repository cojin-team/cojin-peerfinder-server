var router = require('express').Router()
var bodyParser = require('body-parser')
var db = require('../services/database.js')
var connect = require('../services/peercheck.js')

router.use(bodyParser.json())

router.get('/ping', (req, res) => {
    res.send('pong').end()
})

router.get('/getpeers', (req, res) => {
    var selection = []
    for (let i = 0; i < 5; i++) { // select the first 4 peers
        selection.push(db.db.peers[i])
    }
    res.json(selection)
})

router.post('/postpeer', async (req, res) => {
    if (!req.body.peer || typeof req.body.peer != 'string') {
        // return format error
        res.status(500).send('Invalid JSON format')
        res.end()
        return
    }
    // return response
    res.sendStatus(200).end()

    // peer checking
    /// peer in database?
    if (req.body.peer in db.db.peers) return
    /// peer online?
    if (!await connect(
            req.body.peer.split(':')[0], // host
            req.body.peer.split(':')[1]  // port
        )
    ) return

    // add peer to database
    console.log('New peer: ' + req.body.peer)
    db.db.peers.push(req.body.peer)
})

module.exports = router
