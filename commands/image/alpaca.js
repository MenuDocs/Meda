const { CordCommand } = require('cordclient');
const fetch = require('node-fetch');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "alpaca",
            desc: "sends a random alpaca picture",
            group: "image"
        });
    };

    async run(message, args, client) {
        fetch('https://apis.duncte123.me/alpaca')            
        .then(res => res.json()).then(({ data }) => {
            message.channel.send(client.embed.image(data.file));
        });
    };
};