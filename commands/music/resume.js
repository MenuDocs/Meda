module.exports = {
    config: {
        name: "resume",
        desc: "resumes the current player",
        usage: "",
        group: "music",
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
        let audio = client.audio;
        let player = audio.get(message.guild.id);

        if (!player) return message.send(client.lang.get('commands.music.no_player'), audio.embed);
        if (!message.member.voice.channel || !message.member.voice.channel.members.has(client.user.id)) return message.send(client.lang.get('commands.music.!in_my_vc'), audio.embed);
        if (!player.paused) return message.send(client.lang.get('commands.music.!song_paused'), audio.embed);

        player.pause(false);
        return message.send(client.lang.get("commands.music.song_resumed"), audio.embed);
    }
};