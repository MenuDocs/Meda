module.exports = {
    config: {
        name: "unban",
        desc: "unbans a member",
        group: "moderation",
        usage: "<member id> <reason>",
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
        let bans = await message.guild.fetchBans();
        let member = args[0];
        let reason = args.slice(1).join(" ");

        if (!args[0]) return message.send(client.lang.get('commands.mod.arg_unban_member'));
        if (!bans.has(member)) return message.send(client.lang.get('commands.mod.val_unban_member'));
        if (!reason) return message.send(client.lang.get('commands.mod.unban_reason'));

        bans.remove(member);
        message.send(client.lang.get('commands.modunban_success'));
        return message.util.logUnban([member, message.member, reason]);
    }
}