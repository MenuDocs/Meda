const { CordEvent } = require('cordclient');

module.exports = class extends CordEvent {
    constructor(client) {
        super(client, {
            name: 'error'
        });
    };

    async run(error) { 
        this.log.error(error); 
    };
};
