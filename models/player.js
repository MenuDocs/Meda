module.exports = {
	id: String,
	profile: {
		guild: String,
		coins: { type: Number, default: 0 },
		level: { type: Number, default: 1 },
		xp: { type: Number, default: 0 }
	},
	playlist: {
		songCount: { type: Number, default: 0 },
		songs: { type: Array, default: [] }
	}
};