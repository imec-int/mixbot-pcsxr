// map xbox-like configuration (u, r, d, l, a, b, x, y) to keys for emulator for both players
// don't use arrows in the emulator but regular keys; apparently it's not possible to use key down (to hold a key) with key codes (needed for arrows etc) in applescript
exports.playerConfig = {
	player1: {
		a: 'z',
		b: 'x',
		x: 'a',
		y: 's',
		u: 'r',
		r: 't',
		d: 'f',
		l: 'e'
	},
	player2: {
		a: 'b',
		b: 'n',
		x: 'g',
		y: 'h',
		u: 'o',
		r: 'p',
		d: 'l',
		l: 'i'
	}
};

exports.udp = {
	host: '10.100.11.137', //MiXMini
	port: '6666'
}