const Discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
    config: {
        name: "dog",
        desc: "sends a random dog picture.",
        group: "image",
        usage: "",
        aliases: ["doggo", "bark", "woof"],
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
        fetch("https://api.thedogapi.com/v1/images/search")
            .then(res => res.json())
            .then(data => {
                message.channel.send(new Discord.RichEmbed().setImage(data[0].url).setColor("203145").setAuthor(client.user.username, client.user.displayAvatarURL));
            });
    }
}