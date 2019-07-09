const { CordCommand } = require('cordclient');
const fetch = require('node-fetch');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "birb",
            desc: "sends a random birb picture",
            group: "image"
        });
    };

    async run(message, args, client) {
        fetch('https://api.alexflipnote.dev/birb')
        .then(res => res.json()).then(({ file }) => {
            message.channel.send(client.embed.image(file));
        });
    };
};