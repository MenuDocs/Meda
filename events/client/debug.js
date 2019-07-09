const { CordEvent } = require('cordclient');

module.exports = class extends CordEvent {
    constructor(client) {
        super(client, {
            name: 'debug',
            disabled: true
        });
    };

    async run(message) { this.log.debug(message); };
};
