const { CordCommand } = require('cordclient');
module.exports = class volume extends CordCommand {
    constructor(client) {
        super(client, {
            name: "volume",
            desc: "changes or gives you the current volume of the player.",
            usage: "[5-100]",
            group: "music",
            aliases: ['vol'],
            guildBound: true,
        });
    };

    async run(message, args, client) {
        let player = message.guild.player;
        let volume = parseInt(args[0]);

        if (!player) return this.send(this.locale.get('commands.music.no_player'), client.audio.embed);
        if (!volume) return this.send(this.locale.get('commands.music.cur_volume').format([player.state.volume]), client.audio.embed);
        if (!player.channel.members.has(message.author.id)) return this.send(this.locale.get('commands.music.!in_my_vc'), client.audio.embed);
        if (!volume.between(5, 100)) return this.send(this.locale.get('commands.music.volume_limit').format(['5-100']), client.audio.embed);

        await player.volume(volume);
        return this.send(this.locale.get('commands.music.new_volume').format([volume]), client.audio.embed);
    };
};