const { format, capatalize } = require('../../client/index').StringUtils;
module.exports = {
    config: {
        name: "cmdchannel",
        desc: "set or view the channel for commands.",
        group: "settings",
        usage: "[channel|reset]",
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
        let get = id => message.guild.channels.get(id);
        let set = dt => client.db.updateGuild(message.guild.id, dt);
        let guild = await client.db.getGuild(message.guild.id);
        let channel = await client.find.channel(args.join(" "), message.guild);

        if (!args[0]) return message.send(client.lang.get("commands.conf.view_channel").format([get(guild.cmdchannel) || "`None`"]));
        if (args[0] == "reset") return message.send(client.lang.get("commands.conf.rst_channel")) && set({ cmdchannel: '0' });
        if (!channel) return message.send(client.lang.get("commands.conf.val_channel"));

        set({ cmdchannel: channel.id });
        return message.send(client.lang.get("commands.conf.set_channel").format([channel, channel.id]));
    }
}