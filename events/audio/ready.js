const { CordEvent } = require('cordclient');

module.exports = class extends CordEvent {
    constructor(client) {
        super(client, {
            name: 'ready',
            eventFor: client.audio
        });
    };

    async run(node) {
        let client = this.client;
        client.audio.log.info(`Connected to (${node.host})`)
    };
};
