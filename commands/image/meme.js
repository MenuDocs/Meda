const Discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
    config: {
        name: "meme",
        desc: "sends a random meme",
        group: "image",
        usage: "",
        aliases: [],
        guildOnly: false,
        ownerOnly: false,
        userPerms: [],
        clientPerms: []
    },

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        fetch("https://some-random-api.ml/meme")
            .then(res => res.json())
            .then(data => {
                message.channel.send(client.embed.image(data.url).setAuthor(client.user.username, client.user.displayAvatarURL));
            });
    }
}