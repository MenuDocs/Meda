const Discord = require("discord.js");
const { readdirSync } = require('fs');

module.exports = {
    config: {
        name: "help",
        desc: "displays the bots commands",
        group: "util",
        usage: "[command]",
        aliases: ["commands"],
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
        if (args[0] && client.commands.some(c => c.config.name.toLowerCase() === args[0].toLowerCase() || c.config.aliases.includes(args[0]))) {
            let yesno = val => val ? "✅" : "❎";
            let command = (client.commands.get(args[0]) || client.aliases.get(args[0])).config
            let commandEmbed = client.embed.message(`\n\n**❯ Group:** ${command.group !== "" ? command.group : "None"}\n**❯ Aliases:** ${command.aliases.join(", ") || "None"}\n**❯ Guild Only: ${yesno(command.guildOnly)}\n❯ Owner Only: ${yesno(command.ownerOnly)}**`)
                .setTitle(`${message.prefix}${command.name} ${command.usage}`)
                .setFooter(command.desc)
            return message.channel.send(commandEmbed);
        };
        let embed = new Discord.MessageEmbed()
            .setColor(client.embed.defEmbed.color)
            .setFooter(`[MenuDocs] Advanced`, client.user.displayAvatarURL)
            .setTimestamp(new Date()).setTitle("")
            .setDescription(`[MenuDocs] Advanced was made to show the viewers of [MenuDocs] what is possible with the **[discord.js](https://discord.js.org/)** library.\n\n**required <>, optional []**`)

        readdirSync('./commands/').forEach((category) => {
            const thisCategory = client.commands.filter(c => c.config.group === category);
            if (thisCategory.size < 1) return;
            const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
            embed.addField(`❯ ${capitalise} `, thisCategory.map(c => `\`${c.config.name}\``).join(', '));
        });

        return message.channel.send(embed);
    }
}