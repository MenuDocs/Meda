module.exports = {
    config: {
        name: "remove",
        desc: "removes a song from the queue",
        group: "music",
        usage: "<number>",
        aliases: ["rmv"],
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
        let vc = message.member.voice.channel
        let audio = client.audio;
        let player = audio.get(message.guild.id);

        if (!player) return message.send(client.lang.get('commands.music.no_player'), audio.embed);

        let choice = parseInt(args[0] - 1) ? -1 : 0;
        if (!vc || !vc.members.has(client.user.id)) return message.send(client.lang.get('commands.music.!in_my_vc'), audio.embed);
        else if (isNaN(choice) || !choice) return message.send(`**<:no:582718258008817674> I need a number.**`, audio.embed);
        else if (player.next.length < choice + 1) return message.send(`**<:no:582718258008817674> Please pick an existing song.**`, audio.embed);
        else if (player.reqs.get(player.next[choice].track) !== message.author.id) return message.send(client.lang.get('commands.music.didnt_request'), audio.embed);
        try {
            let song = player.next[choice];
            await require('lodash').remove(player.next, s => s.title == player.next[choice].title);
            return message.send(client.lang.get("commands.music.song_removed").format([song.title, song.uri]), audio.embed);
        } catch (e) {
            audio.log.error(`Ran into an error: {e}`);
            return message.send(client.lang.get("commands.music.error").format([e]), audio.embed);
        };
    }
};