var net = require('net')

// stolen from https://stackoverflow.com/questions/26448186/how-to-promisify-node-js-net-connect-with-bluebird
function connectAsync(host, port) {
    return new Promise(function (resolve, reject) {
        var socket = net.connect({'host': host, 'port': port});
        socket.once('connect', function () {
            socket.removeListener('error', reject);
            socket.destroy()
            resolve(true);
        });
        socket.once('error', function (err) {
            socket.removeListener('connection', resolve);
            resolve(false);
        });
    });
}

module.exports = connectAsync

/* examples
connectAsync('google.com', 80).then((socket) => {
    socket.destroy()
    console.log('1 open')
}).catch((err) => {
    console.log('1 closed')
})

connectAsync('127.0.0.1', 8077).then((socket) => {
    socket.destroy()
    console.log('2 open')
}).catch((err) => {
    console.log('2 closed')
}) */
