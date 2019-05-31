const { format, capatalize } = require('../../client/index').StringUtils;
module.exports = {
    config: {
        name: "clear",
        desc: "deletes messages from a channel",
        group: "moderation",
        usage: "<amount> <reason>",
        aliases: ["purge"],
        guildOnly: false,
        ownerOnly: false,
        userPerms: ["MANAGE_MESSAGES"],
        clientPerms: ["MANAGE_MESSAGES"],
    },

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let amount = parseInt(args[0]);
        let reason = args.slice(1).join(" ");

        if (!amount || amount < 5 || amount > 100) return message.send(client.lang.get('commands.mod.no_purge_amount'));
        if (!reason) return message.send(client.lang.get('commands.mod.no_purge_reason'));

        let messages = await message.channel.messages.fetch({ limit: amount });        
        let deleted = await message.channel.bulkDelete(messages, true);
        message.sendTimed(client.lang.get('commands.mod.purge_success').format([deleted.size]), 16000);
        return message.util.logPurge(message.channel, message.member, deleted, reason);
    }
};