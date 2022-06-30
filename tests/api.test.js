var express = require('express')
var app = express()
var fs = require('fs')
var fetch = require('node-fetch').default

// Setup Sandbox
beforeAll(() => {
    // .env simulation
    process.env.dbpath = 'dbtest.log'
    
    // database simulation
    fs.writeFileSync(process.env.dbpath, '{"peers": []}')

    // mount app
    app.use('/',
        require('../src/routes/api.js')
    )
    process.server = app.listen(8989)
})
var url = 'http://localhost:8989'


// Start actual testing
test('/ping endpoint test', async () => {
    // Request
    var response = await fetch(url + '/ping')
    // Check response
    response.text((text) => {
        expect(text).toBe('pong')
    })
})

test('/postpeer endpoint add peer test', async () => {
    // Request
    var response = await fetch(url + '/postpeer', {
        method: "post",
        body: "{'peer': 'google.com:80'}",
        headers: {"Content-Type": "application/json"}
    })
    // Check response
    response.text((text) => {
        expect(text).toBe('OK')
    })
})

test('/getpeers endpoint test', async () => {
    // Request
    var response = await fetch(url + '/getpeers')
    // Check Response
    response.json((peers) => {
        expect(peers).toBe(["google.com:80", null, null, null, null])
    })
})

// Clear Sandbox
afterAll(() => {
    process.server.close()
    clearInterval(process.env.dbsaver)
    fs.rmSync(process.env.dbpath)
})
