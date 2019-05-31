module.exports = {
    config: {
        name: "queue",
        desc: "displays the current queue.",
        group: "music",
        usage: "[remove:] <number>",
        aliases: ["q"],
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

        let hl = (name, link) => `[${name}](${link})`;
        if (!args[0]) return message.send(`**Current:** ${hl(player.current.title, player.current.uri)}\n\n${player.next.map((s, i) => `**${i + 1}) ${hl(s.title, s.uri)} [<@${player.reqs.get(s.track)}>]**`).join("\n")}`, audio.embed);
        else if (args[0].toLowerCase() == 'remove') {
            let choice = parseInt(args[1] - 1);
            if (!vc || !vc.members.has(client.user.id)) return message.send(client.lang.get('commands.music.!in_my_vc'), audio.embed);
            else if (isNaN(choice || !choice)) return message.send(`**<:no:582718258008817674> I need a number.**`, audio.embed);
            else if (player.next.length < choice + 1) return message.send(`**<:no:582718258008817674> Please pick an existing song.**`, audio.embed);
            else if (player.reqs.get(player.next[choice].track) !== message.author.id) return message.send(client.lang.get('commands.music.didnt_request'), audio.embed);
            try {
                await require('lodash').remove(player.next, s => s.title == player.next[choice].title);
                return message.send(client.lang.get("commands.music.song_removed").format([player.next[choice].title, player.next[choice].uri]), audio.embed);
            } catch (e) {
                audio.log.error(`Ran into an error: {e}`);
                return message.send(client.lang.get("commands.music.error").format([e]), audio.embed);
            };
        };
    }
};