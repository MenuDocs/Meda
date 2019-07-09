const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');
const beautify = require('beautify');

const { CordCommand } = require('cordclient');
module.exports = class EvalCommand extends CordCommand {
    constructor(client) {
        super(client, {
            name: "eval",
            desc: "Evaluates js code",
            group: "owner",
            usage: `<input>`,
            aliases: ["e"],
            ownerBound: true,
        });
    };

    async run (message, args, client) {
        let embed = new MessageEmbed(client.embed.transform());
        let toEval = args.join(" ");
        if (!toEval) return this.send("**<:No:586781019319828480> Cannot Evaulate Air.**");
        try {
            let _ = eval(toEval);
            let hrStart = process.hrtime();
            let hrDiff = process.hrtime(hrStart);

            embed.addField("Input:", `\`\`\`js\n${beautify(toEval, { format: "js" }).trunc(1020, true)}\n\`\`\``);
            embed.addField('Output', `\`\`\`js\n${beautify(inspect(_, { depth: 0 }), { format: "js" }).trunc(1020, true)}\`\`\``);
            embed.addField('\u200B', `**\:scroll: Type: \`${(typeof _).replace(/\w\S+/g, s => s.capitalize())}\`\n\:clock1: Time Taken:** *${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms*`);
        } catch (error) {
            embed.addField("Error:", `\`\`\`js\n${error.message.trunc(1020, true)}\n\`\`\``);
            embed.addField("Input:", `\`\`\`js\n${beautify(toEval, { format: "js" }).trunc(1020, true)}\n\`\`\``);
            embed.setColor("RED");
        };
        message.channel.send(embed);
    };
};