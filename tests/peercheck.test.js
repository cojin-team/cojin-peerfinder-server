var connect = require('../src/services/peercheck.js')

test('Check open port', async () => {
    expect(await connect('google.com', '80').toBeTruthy())
})

test('Check closed port', async () => {
    expect( await connect('localhost', '34567').toBeFalsy())
})
