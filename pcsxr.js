//script for mixbot: toetsen die aanvaard worden zijn a, b, x, y, u, l, r, d
//macmini is wat traag unfortunately

// divide users in two camps
var player1 = [];
var player2 = [];
var keyQueue = [];
// aan te passen naargelang de locatie van dit hubot-script t.o.v. config en keysend
var config = require('./config');
var keysend = require('./keysend');
var player1Config = config.playerConfig.player1;
var player2Config = config.playerConfig.player2;
var processing = false;
var timeoutHandle;
function addToQueueForPlayer(msg, user){
	// split in words and first known character for every word counts
	var words = msg.split(' ');
	for(var i = 0; i < words.length; i++){
		var word = words[i];
		for(var j=0; j < word.length; j++){
			var letter = word[j];
			// keys zijn zelfde
			var keys = Object.keys(player1Config);
			var index = keys.indexOf(letter);
			if(index >= 0){
				keyQueue.push(config.playerConfig[user][letter]);
				break;
			}
		}
	}
}

function processQueue(){
	if(keyQueue.length > 0){
		processing = true;
		keysend.sendKeysToApp(keyQueue[0], 'PCSXR');
		console.log(keyQueue[0]);
		keyQueue.shift();
		setTimeout(processQueue, 1000);
	} else processing = false;
}

module.exports = function(robot) {
	robot.hear(/[\s\S]*/, function(msg) {
		clearTimeout(timeoutHandle);
		var user = msg.message.user.name;
		var isPlayer1 = player1.indexOf(user) >= 0;
		var isPlayer2 = player2.indexOf(user) >= 0;
		if(isPlayer1)
			addToQueueForPlayer(msg.match[0], 'player1');
		else if(isPlayer2)
			addToQueueForPlayer(msg.match[0], 'player2');
		else {
			if(player1.length <= player2.length) {
				player1.push(user);
				addToQueueForPlayer(msg.match[0], 'player1');
			}
			else {
				player2.push(user);
				addToQueueForPlayer(msg.match[0], 'player2');
			}
		}
		if(!processing) processQueue();
		setTimeout(function(){
			player1.length = 0;
			player2.length = 0;
			keyQueue.length = 0;
		}, 7200);
	});
};