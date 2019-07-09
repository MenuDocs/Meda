const { CordCommand } = require('cordclient');
const fetch = require('node-fetch');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "meme",
            desc: "sends a random meme",
            group: "image"
        });
    };

    async run(message, args, client) {
        fetch('https://apis.duncte123.me/meme')
        .then(res => res.json()).then(({ data }) => {
            message.channel.send(client.embed.image(data.image).setTitle(data.title).setURL(data.url));
        });
    };
};