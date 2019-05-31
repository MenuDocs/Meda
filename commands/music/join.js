module.exports = {
    config: {
        name: "join",
        desc: "joins your voice channel",
        group: "music",
        usage: "",
        aliases: ["j", "summon"],
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
        let player = client.audio.get(message.guild.id);

        if (player) return message.send(client.lang.get('commands.music.ac_player'), audio.embed);
        if (!message.member.voice.channel) return message.send(client.lang.get('commands.music.!in_my_vc'), audio.embed);

        audio.join(message);
        return message.send(client.lang.get('commands.music.joined_vc').format([message.member.voice.channel.name]), audio.embed);
    }   
};