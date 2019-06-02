const Discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
    config: {
        name: "lizard",
        desc: "sends a random picture of a lizard.",
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
        fetch("https://nekos.life/api/v2/img/lizard")
            .then(res => res.json())
            .then(data => {
                message.channel.send(client.embed.image(data.url).setAuthor(client.user.username, client.user.displayAvatarURL));
            });
    }
}