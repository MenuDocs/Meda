const { format, capatalize } = require('../../client/index').StringUtils;
module.exports = {
    config: {
        name: "prefix",
        desc: "set or view the current prefix.",
        group: "settings",
        usage: "[prefix|reset]",
        aliases: [],
        guildOnly: true,
        ownerOnly: false,
        userPerms: ["MANAGE_GUILD"],
        clientPerms: [],
    },

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let set = data => client.db.updateGuild(message.guild.id, data);
        let guild = await client.db.getGuild(message.guild.id);
        let prefix = args.join(" ");

        if (!prefix) return message.send(client.lang.get("commands.conf.view_prefix").format([guild.prefix]));
        if (prefix.length > 5) return message.send(client.lang.get("commands.conf.long_prefix"));
        if (args[0] == "reset") return message.send(client.lang.get("commands.conf.rst_prefix")) && set({ prefix: 'a!' });

        set({ prefix });
        return message.send(client.lang.get("commands.conf.set_prefix").format([prefix]));
    }
}