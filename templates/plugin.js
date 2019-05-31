module.exports = class extends require('../client/plugins/plugin') {
    constructor(parent, client) {
        super(parent, client, {
            name: '',
            process: {
                now: false,
                cmd: '',
                event: ''
            }
        });
    };

    async run() {};
};
