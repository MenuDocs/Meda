const { CordCommand } = require('cordclient');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "ping",
            desc: "Sends a message showing the bots latency.",
            group: "misc",
            aliases: ["pong"],
        });
    };

    async run (message, args, client) {
        let random = this.locale.get("commands.ping_responses")[Math.floor(Math.random() * 3)];
        this.send(`${random}\n**Bot: \`${Math.round(client.ws.ping)}ms\`**`).then(m => {
            m.delete()
            this.send(`${random}\n**Bot: \`${Math.round(client.ws.ping)}ms\` API: \`${Math.round(m.createdTimestamp-message.createdTimestamp)}ms\`**`);
        });
    }
}