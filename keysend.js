var applescript = require('applescript');

function sendKeysToApp(keys, app){
	var script =
	'tell app "' + app + '"\n' +
		'\tactivate\n' +
	'end tell\n' +
	'tell app "System Events"\n' +
		// repeat is nodig om door de gameloop gedetecteerd te worden
		// optimale aantal afhankelijk van computer waarop je draait denk ik
		'repeat 1500 times\n' +
			'\tkeystroke "' + keys + '"\n' +
			//key down is niet nodig voor meerdere toetsen en geeft zelfs problemen met een delay erbij (extra slag)
			// '\tdelay 0.2\n' +
			// '\tkey up "' + keys + '"\n' +
		'end repeat\n' +
	'end tell\n';
	applescript.execString(script, function(err, rtn) {
		if(err) console.log(err);
	});
}

exports.sendKeysToApp = sendKeysToApp;
