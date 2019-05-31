module.exports = {
    config: {
        name: "ban",
        desc: "Bans a guild member",
        group: "moderation",
        usage: "<member> <reason>",
        aliases: [],
        guildOnly: true,
        ownerOnly: false,
        userPerms: ["BAN_MEMBERS"],
        clientPerms: ["BAN_MEMBERS"],
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

        if (!args[0]) return message.send(client.lang.get('commands.mod.arg_ban_member'));
        if (!member) return message.send(client.lang.get('commands.mod.val_ban_member'));
        if (member.roles.highest.position > me.roles.highest.position) return message.send(client.lang.get('commands.mod.member_higher'));
        if (!reason) return message.send(client.lang.get('commands.mod.ban_reason'));

        member.ban({ reason });
        message.send(client.lang.get('commands.mod.ban_success'));
        return message.util.logKB('Ban', [member, message.member, reason]);
    }
}