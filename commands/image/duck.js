const { CordCommand } = require('cordclient');
const fetch = require('node-fetch');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "duck",
            desc: "sends a random duck picture",
            group: "image"
        });
    };

    async run(message, args, client) {
        fetch('https://apis.duncte123.me/animal/duck')
        .then(res => res.json()).then(({ data }) => {
            message.channel.send(client.embed.image(data.file));
        });
    };
};