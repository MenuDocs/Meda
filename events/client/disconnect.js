const { CordEvent } = require('cordclient');

module.exports = class extends CordEvent {
    constructor(client) {
        super(client, {
            name: 'disconnect'
        });
    };

    async run() {
        this.log.fatal('Client Has Disconnected!');
    };
};
