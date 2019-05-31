module.exports = {
    config: {
        name: "addrole",
        desc: "adds a role to a member",
        group: "moderation",
        usage: "<role> <member> <reason>",
        aliases: [],
        guildOnly: true,
        ownerOnly: false,
        userPerms: ["MANAGE_ROLES"],
        clientPerms: ["MANAGE_ROLES"]
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

        if (!args[0]) return message.send(client.lang.get('commands.mod.arg_add_role'));
        if (!role) return message.send(client.lang.get('commands.mod.val_add_role'));
        if (role.position > me.roles.highest.position) return message.send(client.lang.get('commands.mod.add_role_higher'));

        if (!args[1]) return message.send(client.lang.get('commands.mod.arg_add_member'));
        if (!member) return message.send(client.lang.get('commands.mod.val_add_member'));
        if (member.roles.has(role.id)) return message.send(client.lang.get('commands.mod.add_member_hasrole').format([role.name, role.id]));
        if (member.roles.highest.position > me.roles.highest.position) return message.send(client.lang.get('commands.mod.member_higher'));

        if (!reason) return message.send(client.lang.get('commands.mod.add_role_reason'));
        member.roles.add(role.id, reason);
        message.send(client.lang.get('commands.mod.add_role_success'));
        return message.util.logRoleAction('Add Role', member, role, message.member, reason);
    }
}