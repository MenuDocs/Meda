
module.exports = {
    config: {
        name: "bassboost",
        desc: "enables bass boost for the current player",
        usage: "[level]",
        group: "music",
        aliases: ['bb'],
        guildOnly: true,
        ownerOnly: false,
        userPerms: [],
        clientPerms: []
    },

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message} message
     * @param {String[]} args
    /**
     *
     *
     * @param {*} client
     * @param {*} message
     * @param {*} args
     * @returns
     */
    run: async (client, message, args) => {
        let audio = client.audio;
        let player = audio.get(message.guild.id);
        let levels = { high: 0.25, medium: 0.15, low: 0.10, none: 0 };

        if (!player) return message.send(client.lang.get('commands.music.no_player'), audio.embed);
        if (!message.member.voice.channel || !message.member.voice.channel.members.has(client.user.id)) return message.send(client.lang.get('commands.music.!in_my_vc'), audio.embed);
        if (!args[0]) return message.send(client.lang.get('commands.music.cur_basslvl').format([player.basslvl.capatalize()]), audio.embed)
        if (args[0] !== 'none' && !levels[args[0]]) return message.send(client.lang.get("commands.music.avaliable_lvls").format([Object.keys(levels).join(', ')]), audio.embed);

        player.basslvl = args[0]
        player.equalizer([ { band: 0, gain: levels[args[0]] }, { band: 1, gain: levels[args[0]] }, { band: 2, gain: levels[args[0]] } ]);
        return message.send(client.lang.get("commands.music.new_basslvl").format([args[0].capatalize()]), audio.embed)
    }
};