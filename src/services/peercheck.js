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

/* Example
connectAsync('google.com', 80).then((open) => {
    if(open) console.log('Port open')
    else console.log('Port closed')
}) */
