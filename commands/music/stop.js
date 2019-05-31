module.exports = {
    config: {
        name: "stop",
        desc: "stops & clears the queue.",
        group: "music",
        usage: "",
        aliases: [],
        guildOnly: true,
        ownerOnly: false,
        userPerms: [],
        clientPerms: []
    },

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let vc = message.member.voice.channel;
        let audio = client.audio;
        let player = audio.get(message.guild.id);

        if (!player) return message.send(client.lang.get('commands.music.no_player'), audio.embed);
        if (!vc || !vc.members.has(client.user.id)) return message.send(client.lang.get('commands.music.!in_my_vc'), audio.embed);

        return await audio.leave(message);
    }
}