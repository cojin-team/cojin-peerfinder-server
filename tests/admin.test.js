var express = require('express')
var app = express()
var fs = require('fs')
var fetch = require('node-fetch').default

// Setup Sandbox
beforeAll(() => {
    // .env emulation
    process.env.dbpath = 'dbtest.log'
    process.env.dbwriteInterval = '30'
    process.env.auth = 'test'
    
    // database emulation
    fs.writeFileSync(process.env.dbpath, '{"peers": ["google.com:80", "google.com:443"]}')

    // mount app
    app.use('/',
        require('../src/routes/admin.js')
    )
    clearInterval(process.env.dbsaver) // stop garbage collector
    process.server = app.listen(8989)
})
var url = 'http://localhost:8989'

test('/allPeers endpoint test', async () => {
    // Request
    var response = await fetch(url + '/allPeers', {
        method: "post",
        body: JSON.stringify({'auth': process.env.auth}),
        headers: {"Content-Type": "application/json"}
    })
    // Check Response
    response.json((peers) => {
        expect(peers).toBe(["google.com:80", "google.com:443"])
    })
})

test('/deletePeers selective delete endpoint test', async () => {
    // Requests
    var delResponse = await fetch(url + '/deletePeers', {
        method: "post",
        body: JSON.stringify({
            'peers': ['google.com:443'],
            'auth': process.env.auth
        }),
        headers: {"Content-Type": "application/json"}
    })

    var checkResponse = await fetch(url + '/allPeers', {
        method: "post",
        body: JSON.stringify({'auth': process.env.auth}),
        headers: {"Content-Type": "application/json"}
    })

    // Check Responses
    delResponse.text((text) => {
        expect(text).toBe('OK')
    })

    checkResponse.json((peers) => {
        expect(peers).toBe(['google.com:80'])
    })
})

test('/deletePeers wipe endpoint test', async () => {
    // Requests
    var delResponse = await fetch(url + '/deletePeers', {
        method: "post",
        body: JSON.stringify({
            'auth': process.env.auth
        }),
        headers: {"Content-Type": "application/json"}
    })

    var checkResponse = await fetch(url + '/allPeers', {
        method: "post",
        body: JSON.stringify({'auth': process.env.auth}),
        headers: {"Content-Type": "application/json"}
    })

    // Check Responses
    delResponse.text((text) => {
        expect(text).toBe('OK')
    })

    checkResponse.json((peers) => {
        expect(peers).toBe([])
    })
})

// Clear Sandbox
afterAll(() => {
    process.server.close()
    fs.rmSync(process.env.dbpath)
})
