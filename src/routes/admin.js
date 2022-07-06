var router = require('express').Router()
var bodyParser = require('body-parser')
var db = require('../services/database.js')

router.use(bodyParser.json())

// Admin authentication middleware
router.use((req, res, next) => {
    if (!req.body.auth == process.env.auth) {
        res.sendStatus(403).end()
    } else {
        next()
    }
})

router.post('/allPeers', (req, res) => {
    res.json(db.db.peers)
})

router.post('/deletePeers', (req, res) => {
    if (!req.body.peers) {
        db.db.peers = []
    }
    var newPeerlist = db.db.peers.filter((peer) => {
        return !peer in req.body.peers
    })
    db.db.peers = newPeerlist
    res.sendStatus(200)
})

module.exports = router
