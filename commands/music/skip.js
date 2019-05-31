module.exports = {
    config: {
        name: "skip",
        desc: "skips the current playing song in the queue.",
        group: "music",
        usage: "",
        aliases: [],
        guildOnly: true,
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
        let audio = client.audio;
        let voice = message.member.voice;
        let player = client.audio.get(message.guild.id);
        let required = Math.round((voice.channel.members.filter(m => !m.user.bot)).size / 2);

        if (!player) return message.send(client.lang.get('commands.music.no_player'), audio.embed);
        if (!message.member.voice.channel || !message.member.voice.channel.members.has(client.user.id)) return message.send(client.lang.get('commands.music.!in_my_vc'), audio.embed);

        if (player.reqs.get(player.current.track) === message.author.id) return audio.skip(message);
        if (voice.channel.members.filter(m => !m.user.bot).size > 2) {
            let votes = player.current.votes;
            if (votes.includes(message.author.id)) return message.send(client.lang.get('commands.music.already_voted').format([message.member]), audio.embed);
            votes.push(message.author.id);
            if (votes.length >= required) return audio.skip(message);
            return message.send(client.lang.get('commands.music.skip_voted'), audio.embed)
        } else return audio.skip(message);
    }
};