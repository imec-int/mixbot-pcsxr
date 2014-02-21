var config = require('./config');
var keysend = require('./keysend');
var port = config.udp.port;
var host = config.udp.host;
var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    //console.log(remote.address + ':' + remote.port +' - ' + message);
    keysend.sendKeysToApp(message.toString(), 'PCSXR');

});

server.bind(port, host);