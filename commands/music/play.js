const { CordCommand } = require('cordclient');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: 'play',
            desc: 'plays music in your vc',
            group: 'music',
            guildBound: true
        });
    };

    async run(message, args, client) {
        let video;
        let search = args.join(" ");
        let player = message.guild.player;

        if (this.flags.includes('--join')) [await client.audio.join(message), player = message.guild.player];
        if (!player) return this.send(this.locale.get('commands.music.no_player'), client.audio.embed);
        if (!player.channel.members.has(message.author.id)) return this.send(this.locale.get('commands.music.!in_my_vc'), client.audio.embed);

        if(search.match(/^https:?:\/\/\/(www.youtube.com|youtube.com|youtu.be)\/watch(.*)$/g)) video = await client.audio.getTrack(search, 1);
        else if(search.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/)) return this.send(this.locale.get('commands.music.no_support').format(["Playlists"]), client.audio.embed);
        else if(search.match(/^(https|http):?:\/\/\/soundcloud.com\//g)) video = await client.audio.getTrack(search, 1);
        else if(search.match(/^(https|http)\:\/\/open\.spotify\.com\/track\/.+/g)) video = await client.audio.getTrack(search, 1);
        else video = await client.audio.search(search, message);

        if ((Array.isArray(video) ? video[0] : video).length >= 900000) return this.send(this.locale.get('commands.music.song_exceeds_length'), client.audio.embed)

        return client.audio.handleTrack(message, Array.isArray(video) ? video[0] : video);
    };
}