const Discord = require("discord.js");

module.exports = {
    config: {
        name: "botinfo",
        desc: "displays info on the bot",
        group: "util",
        usage: "",
        aliases: ["info", "bi"],
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
        let info = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL)
        .setTitle("About").setColor("203145")
        .setDescription(`Hello, i'm a bot made to show the viewers of [MenuDocs] what is possible with the **[discord.js](https://discord.js.org/)** library and more.\n\n**[MenuDocs Discord](https://discord.gg/MgVaazZ)  /  [MenuDocs Site](https://menudocs.org/)**  `)
        .addField("Info:", `**❯ ID: \`${client.user.id}\`\n❯ Tag: \`${client.user.tag}\`\n❯ Prefix: \`${message.prefix}\`\n❯ Version: \`0.1.5\`**`);
        message.channel.send(info);
    }
}