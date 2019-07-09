module.exports = {
	uri: "", // mongo db uri
	token: "", // bot token
	sentry: "", // get rid of this line if you dont have sentry setup, https://sentry.io/
	owners: [], // bot owners
	registry: {
		builtin: true, // have this true for the CordClient Command System
		prefixes: [], // prefixes
		command: {
			subDirectories: [] // Array of sub folders for the commands directory
		},
		event: {
			subDirectories: [] // same thing for commands but for events?! lol
		}
	},
	audio: {
		yt: "", // google api key with Youtube Data V3 access
        user: "", // [REQUIRED!!!] the bot id
        nodes: [{
            host: "", // node host
            port: 12345, // node port
            provider: "lavalink", // do not touch this unless you are using a andesite node
            password: "" // node password
        }]
	}
};