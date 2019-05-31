module.exports = {
    config: {
        name: "removerole",
        desc: "removes a role from a member",
        group: "moderation",
        usage: "<role> <member> <reason>",
        aliases: ["rr"],
        guildOnly: true,
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
        let me = message.guild.me;
        let role = await client.find.role(args[0], message.guild);
        let member = await client.find.member(args[1], message.guild);
        let reason = args.slice(2).join(" ");

        if (!args[0]) return message.send(client.lang.get('commands.mod.arg_rm_role'));
        if (!role) return message.send(client.lang.get('commands.mod.val_rm_role'));
        if (role.position > me.roles.highest.position) return message.send(client.lang.get('commands.mod.rm_role_higher'));

        if (!args[1]) return message.send(client.lang.get('commands.mod.arg_rm_member'));
        if (!member) return message.send(client.lang.get('commands.mod.val_rm_member'));
        if (!member.roles.has(role.id)) return message.send(client.lang.get('commands.mod.!rm_member_hasrole').format([role.name, role.id]));
        if (member.roles.highest.position > me.roles.highest.position) return message.send(client.lang.get('commands.mod.member_higher'));

        if (!reason) return message.send(client.lang.get('commands.mod.rm_role_reason'));
        member.roles.remove(role.id, reason);
        message.send(client.lang.get('commands.mod.rm_role_success'));
        return message.util.logRoleAction('Remove Role', member, role, message.member, reason);
    }
}