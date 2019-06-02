const Discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
    config: {
        name: "fox",
        desc: "sends a random picture of a fox.",
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
        fetch("https://randomfox.ca/floof/")
        .then(res => res.json())
        .then(data => {
            message.channel.send(client.embed.image(data.image).setAuthor(client.user.username, client.user.displayAvatarURL));
        });
    }
}