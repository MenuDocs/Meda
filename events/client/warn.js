const { CordEvent } = require('cordclient');

module.exports = class extends CordEvent {
    constructor(client) {
        super(client, {
            name: 'warn'
        });
    };

    async run(message) { 
        this.log.warn(message); 
    };
};
