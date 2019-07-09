const { CordCommand } = require('cordclient');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "shutdown",
            desc: "correctly shuts down the bot.",
            group: "owner",
            ownerBound: true
        });
    };

    async run(message, args, client) {
        await this.send(`**<:yes:586781018653196289> Shutting down...**`);
        client.destroy();
        process.exit(0);
    };
};