const { CordCommand } = require('cordclient');
const fetch = require('node-fetch');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "fox",
            desc: "sends a random fox picture",
            group: "image"
        });
    };

    async run(message, args, client) {
        fetch('https://randomfox.ca/floof/')
        .then(res => res.json()).then(({ image }) => {
            message.channel.send(client.embed.image(image));
        });
    };
};