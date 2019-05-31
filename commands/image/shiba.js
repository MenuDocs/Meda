const Discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
    config: {
        name: "shiba",
        desc: "sends a random picture of a shiba inu.",
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
        fetch("http://shibe.online/api/shibes")
            .then(res => res.json())
            .then(data => {
                message.channel.send(new Discord.RichEmbed().setImage(data[0]).setColor("203145").setAuthor(client.user.username, client.user.displayAvatarURL));
            });
    }
}