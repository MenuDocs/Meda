const { CordCommand } = require('cordclient');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "pause",
            desc: "pauses the current player.",
            group: "music",
            guildBound: true,
        });
    };

    async run(message, args, client) {
        let player = message.guild.player;

        if (!player) return this.send(this.locale.get('commands.music.no_player'), client.audio.embed);
        if (!player.channel.members.has(message.author.id)) return this.send(this.locale.get('commands.music.!in_my_vc'), client.audio.embed);
        if (player.paused) return this.send(this.locale.get('commands.music.!song_resumed'), client.audio.embed);

        await player.pause();
        return this.send(this.locale.get('commands.music.song_paused'), client.audio.embed);
    };
};
