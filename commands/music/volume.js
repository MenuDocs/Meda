module.exports = {
    config: {
        name: "volume",
        desc: "Sets the volume of the player.",
        usage: "[number]",
        group: "music",
        aliases: ["vol"],
        guildOnly: true,
        ownerOnly: false,
        userPerms: [],
        clientPerms: []
    },

    run: async (client, message, args) => {
        let vc = message.member.voice.channel;
        let audio = client.audio;
        let volume = parseInt(args[0]);
        let player = audio.get(message.guild.id);

        if (!player) return message.send(client.lang.get('commands.music.no_player'), audio.embed);
        if (!volume) return message.send(client.lang.get('commands.music.cur_volume').format([player.state.volume]), audio.embed);
        if (!vc || !vc.members.has(client.user.id)) return message.send(client.lang.get('commands.music.!in_my_vc'), audio.embed);
        if (!volume.between(1, 100)) return message.send(client.lang.get('commands.music.volume_1-100').format(['1-100']), audio.embed);

        await player.volume(volume);
        return message.send(client.lang.get('commands.music.new_volume').format([volume]), audio.embed);
    }
};