const { RichEmbed } = require("discord.js");
module.exports = {
    config: {
        name: "userinfo",
        desc: "Displays info on a user",
        group: "util",
        usage: "",
        aliases: ["ui"],
        guildOnly: false,
        ownerOnly: false,
        userPerms: [],
        clientPerms: [],
    },

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let user = await client.user.find(args.join(" "), client) || message.author;
        let e = new RichEmbed()
            .setColor("203145").setThumbnail(user.displayAvatarURL)
            .addField("**Username:**", `${user.username}`, true)
            .addField("**ID:**", `${user.id}`, true)
            .addField("**Status:**", `${user.presence.status}`, true)
            .addField("**Created On:**", `${user.createdAt.toLocaleDateString()}`, true);
        message.channel.send(e);
    }
}