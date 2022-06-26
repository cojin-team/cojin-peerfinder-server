var fs = require('fs')

class Database {
    constructor (file) {
        if (fs.existsSync(file)) this.load(file)
        else {
            fs.writeFileSync(file, '{}')
            this.db = {}
        }
        
        this.file = file
        setInterval((db, file) => {
            // Save the db
            fs.writeFileSync(file, JSON.stringify(db))

            // Check the peers
            // not implemented yet

        }, 1000 * 10, this.db, this.file)
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

module.exports = Database
