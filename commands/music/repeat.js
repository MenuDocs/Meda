module.exports = {
    config: {
        name: "repeat",
        desc: "toggles repeat for the current track.",
        group: "music",
        usage: "",
        aliases: ["loop"],
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

        if(!player.repeat) return player.repeat = true && message.send(client.lang.get("commands.music.enabled_loop"), audio.embed);
        player.repeat = false;
        return message.send(client.lang.get("commands.music.disabled_loop"), audio.embed);
    }
};