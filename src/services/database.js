var fs = require('fs')
var peerCheck = require('./peercheck')

class Database {
    constructor (file) {
        if (fs.existsSync(file)) this.load(file)
        else {
            fs.writeFileSync(file, '{}')
            this.db = {}
        }
        
        this.file = file

        //      Peercheck & saver routine           //
        this.saver = setInterval(async (db, file) => {
            // Check the peers
            for (let index = 0; index < db.peers.length; index++) {
                const peer = db.peers[index];
                var host = peer.split(':')[0]
                var port = peer.split(':')[1]
                if (!await peerCheck(host, port)) {
                    db.peers.splice(
                        db.peers.indexOf(peer),
                        1
                    )
                    console.log('Peer ' + peer + ' deleted from db')
                }
            }

            // Save the db
            fs.writeFileSync(file, JSON.stringify(db))
            
        }, 1000 * 30, this.db, this.file)
    }

    load (file) {
        var fileContent = fs.readFileSync(file).toString()
        try {
            var data = JSON.parse(fileContent)
        } catch {
            this.db = {}
            throw 'Parser error on file ' + file
        } finally {
            this.db = data
        }
    }
}

var db = new Database(process.env.dbpath)
if (!db.db.peers) db.db.peers = []
process.env.dbsaver = db.saver

module.exports = db
