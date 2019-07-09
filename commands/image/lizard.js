const { CordCommand } = require('cordclient');
const fetch = require('node-fetch');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "lizard",
            desc: "sends a random lizard picture",
            group: "image"
        });
    };

    async run(message, args, client) {
        fetch('https://nekos.life/api/v2/img/lizard')
        .then(res => res.json()).then(res => {
            message.channel.send(client.embed.image(res.url));
        });
    };
};