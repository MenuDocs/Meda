const { CordCommand } = require('cordclient');
const fetch = require('node-fetch');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "cat",
            desc: "sends a random cat picture",
            group: "image"
        });
    };

    async run(message, args, client) {
        fetch('https://api.thecatapi.com/v1/images/search')
        .then(res => res.json()).then(res => {
            message.channel.send(client.embed.image(res[0].url));
        });
    };
};