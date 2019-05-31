const { format, capatalize } = require('../../client/index').StringUtils;
module.exports = {
    config: {
        name: "defvolume",
        desc: "",
        group: "settings",
        usage: "",
        aliases: [],
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
        let set = data => client.db.updateGuild(message.guild.id, data);
        let guild = await client.db.getGuild(message.guild.id);
        let volume = parseInt(args[0]);

        if (!volume) return message.send(client.lang.get("commands.conf.view_volume").format([guild.defvolume]));
        if (!volume.between(1, 100)) return message.send(client.lang.get("commands.conf.bad_volume"));
        if (args[0] == "reset") return message.send(client.lang.get("commands.conf.rst_volume")) && set({ defvolume: 50 });

        set({ defvolume: volume });
        return message.send(client.lang.get("commands.conf.set_volume").format([volume]));
    }
}