const { MessageEmbed } = require('discord.js');
const { CordCommand } = require('cordclient');
const { readdirSync } = require('fs');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "help",
            desc: "displays the bots commands",
            group: "misc",
            usage: "[command]",
            aliases: ["commands", "?", "halp", "whatisthis"],
        });
    };

    async run(message, args, client) {
        let embed = new MessageEmbed(client.embed.transform());
        if (args[0] && this.registry.commands.some(cc => cc.triggers.includes(args[0].toLowerCase()))) {
            let yesno = v => v ? "Yes" : "No";
            let command = this.registry.getCommand(args[0].toLowerCase());
            message.channel.send(embed.setTitle(`b!${command.name} ${command.usage}`)
                .setDescription(`${command.desc}\n\n**Group:** ${command.group}\n**Aliases:** ${command.aliases.join(', ')}\n**Guild Bound:** ${yesno(command.guildBound)}\n**Owner Bound:** ${yesno(command.ownerBound)}`));
        } else {
            embed.setDescription(`[Meda] is a "Advanced" **[discord.js](https://discord.js.org/)** Bot with Lavalink Support. Backed By: **[[MenuDocs]](https://www.menudocs.org/)**`);
            for (let categoryName of readdirSync('./commands/')) {
                let category = this.registry.commands.filter(cc => cc.group === categoryName);
                if (category.size > 0) embed.addField(`${categoryName.capitalize()} [ ${category.size} ]`, category.map(cc => `\`${cc.name}\``).join(', '));
            };
            message.channel.send(embed);
        };
    };
};