var router = require('express').Router()
var bodyParser = require('body-parser')
var Database = require('../services/database.js')

router.use(bodyParser.json())
var db = new Database(process.env.dbpath)
if (!db.db.peers) db.db.peers = []
process.env.dbsaver = db.saver

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

router.post('/postpeer', (req, res) => {
    if (!req.body.peer || typeof req.body.peer != 'string') {
        // return format error
        res.status(500).send('Invalid JSON format')
        res.end()
        return
    }
    // save the peer in the database
    console.log('New peer: ' + req.body.peer)
    db.db.peers.push(req.body.peer)
    res.sendStatus(200).end()
})

module.exports = router
