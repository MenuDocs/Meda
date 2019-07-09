const { CordEvent } = require('cordclient');

module.exports = class extends CordEvent {
    constructor(client) {
        super(client, {
            name: 'disconnect',
            eventFor: client.audio
        });
    };

    async run(node) {
        let client = this.client;
        return client.audio.log.fatal(`(${node.host}) has disconnected.`);
    };
};
