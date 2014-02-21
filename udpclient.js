var keypress = require('keypress');
// var keysend = require('./keysend');
var config = require('./config');
var port = config.udp.port;
var host = config.udp.host;
var dgram = require('dgram');
var client = dgram.createSocket('udp4');


// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
	if (key && key.name) {
		// console.log(key.name);
		var message = new Buffer(key.name);
		// keysend.sendKeysToApp(key.name, 'PCSXR');
		client.send(message, 0, message.length, port, host, function(err, bytes) {
		    if(err) console.log(err);
		});
	}
	if (key && key.ctrl && key.name == 'c') {
		process.stdin.pause();
		client.close();
	}
});

process.stdin.setRawMode(true);
process.stdin.resume();