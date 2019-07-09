const { CordCommand } = require('cordclient');
const fetch = require('node-fetch');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "dog",
            desc: "sends a random dog picture",
            group: "image"
        });
    };

    async run(message, args, client) {
        fetch('https://api.thedogapi.com/v1/images/search')
        .then(res => res.json()).then(res => {
            message.channel.send(client.embed.image(res[0].url));
        });
    };
};