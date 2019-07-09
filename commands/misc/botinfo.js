const { MessageEmbed } = require("discord.js");
const { CordCommand } = require('cordclient');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "botinfo",
            desc: "displays info on the bot",
            group: "misc",
            aliases: ["info", "bi"],
        });
    };

    async run (message, args, client) {
        let info = new MessageEmbed(client.embed.transform())
        info.setThumbnail(client.user.displayAvatarURL).setTitle("About");
        info.setDescription(`[Meda] is a "Advanced" **[discord.js](https://discord.js.org/)** Bot with Lavalink Support. Backed By: **[[MenuDocs]](https://www.menudocs.org/)**`);
        info.addField("Info:", `**Name:** ${client.user.tag} (${client.user.id})\n**Prefix:** a!\n**Version:** 1.1.0`);
        message.channel.send(info);
    }
}