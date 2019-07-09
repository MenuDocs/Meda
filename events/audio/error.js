const { CordEvent } = require('cordclient');

module.exports = class extends CordEvent {
    constructor(client) {
        super(client, {
            name: 'error',
            eventFor: client.audio
        });
    };

    async run(node, error) {
        let client = this.client;
        return client.audio.log.error(`(${node.host})`, error);
    };
};
