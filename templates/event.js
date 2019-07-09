const { CordEvent } = require('cordclient');

module.exports = class extends CordEvent {
    constructor(client) {
        super(client, {
            name: '',
            eventFor: null,
            disabled: false
        });
    };

    async run() {};
};
