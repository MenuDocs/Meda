const { CordCommand } = require('cordclient');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "invite",
            desc: "grabs an invite for the bot.",
            group: "misc"
        });
    };

    async run(message, args, client) {
        let invite = `**Invite: [No Perms](${await client.generateInvite()})\nInvite: [Administrator](${await client.generateInvite(['ADMINISTRATOR'])})**`;
        this.send(invite);
    };
};