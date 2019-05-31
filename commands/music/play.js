module.exports = {
    config: {
        name: "play",
        desc: "plays a specified song",
        group: "music",
        usage: "<query>",
        aliases: ["p"],
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
        let url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
        let search = args.join(" ");

        if (!player) return message.send(client.lang.get('commands.music.no_player'), audio.embed);
        if (!message.member.voice.channel || !message.member.voice.channel.members.has(client.user.id)) return message.send(client.lang.get('commands.music.!in_my_vc'), audio.embed);

        let video;
        if(url.match(/^https:?:\/\/\/(www.youtube.com|youtube.com|youtu.be)\/watch(.*)$/g)) video = await audio.lavaSearch(message, search, 1);
        else if(url.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/)) return message.send(client.lang.get('commands.music.no_support').format(["Playlists"]), audio.embed);
        else if(url.match(/^(https|http):?:\/\/\/soundcloud.com\//g)) video = await audio.lavaSearch(message, search, 1);
        else if(url.match(/^(https|http)\:\/\/open\.spotify\.com\/track\/.+/g)) video = await audio.lavaSearch(message, search, 1);
        else video = await audio.ytSearch(message, search, 1);

        return audio.handleTrack(video[0], message);
    }
};