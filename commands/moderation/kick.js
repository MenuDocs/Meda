const Discord = require("discord.js");

module.exports = {
    config: {
        name: "kick",
        desc: "kick a guild member",
        group: "moderation",
        usage: "<member> [reason]",
        aliases: [],
        guildOnly: false,
        ownerOnly: false,
        userPerms: ["KICK_MEMBERS"],
        clientPerms: ["KICK_MEMBERS"],
    },

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let me = message.guild.me;
        let member = await client.find.member(args[0], message.guild);
        let reason = args.slice(1).join(" ");

        if (!args[0]) return message.send(client.lang.get('commands.mod.arg_kick_member'));
        if (!member) return message.send(client.lang.get('commands.mod.val_kick_member'));
        if (member.roles.highest.position > me.roles.highest.position) return message.send(client.lang.get('commands.mod.member_higher'));
        if (!reason) return message.send(client.lang.get('commands.mod.kick_reason'));

        member.kick(reason);
        message.send(client.lang.get('commands.mod.kick_success'));
        return message.util.logKB('Kick', [member, message.member, reason]);
    }
}