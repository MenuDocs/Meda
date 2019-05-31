module.exports = {
    config: {
        name: "spacechannel",
        desc: "Replaces the - in channel names with a space.",
        group: "util",
        usage: "[channel(s)|all]",
        aliases: ["spacemychannel", "smc"],
        guildOnly: true,
        ownerOnly: false,
        userPerms: [],
        clientPerms: []
    },

    run: async (client, message, args) => {
        let channels = message.mentions.channels;

        if (args[0] == "all") return message.send(`**Spaced all Channels.**`) && message.guild.channels.forEach(channel => change(channel));
        if (args[0] == "revert") return message.send(`**Reverted all Channels.**`) && message.guild.channels.forEach(channel => change(channel, 'revert'));
        if (channels.size < 1) return message.send(`**Spaced Channels: ${(channels.first() !== undefined ? undefined : message.channel)}**`) && change((channels.first() !== undefined ? undefined : message.channel));

        channels.forEach(async channel => change(channel));
        return message.send(`**Spaced Channels: ${channels.map(channel => `${channel}`).join(', ')}**`);
    }
};

function change(channel, action = "space") {
    if (action == "space") channel.setName(channel.name.replace(/-/g, "\u2009\u2009"));
    else channel.setName(channel.name.replace("\u2009\u2009", '-'));
};