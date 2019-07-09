const { CordCommand } = require('cordclient');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "repeat",
            desc: "enables repeat for the queue or track",
            usage: "[--queue]",
            group: "music",
            guildBound: true
        });
    };

    async run(message, args, client) {
        let player = message.guild.player;
        let target = 'track';

        if (!player) return this.send(this.locale.get('commands.music.no_player'), client.audio.embed);
        if (!player.channel.members.has(message.author.id)) return this.send(this.locale.get('commands.music.!in_my_vc'), client.audio.embed);
        if (this.flags.includes('--queue')) target = 'queue';

        if (player.repeat[target]) player.repeat[target] = false;
        else player.repeat[target] = true;
        return this.send(this.locale.get(`commands.music.${target}_loop`).format([ player.repeat[target] ? 'Enabled' : 'Disabled' ]), client.audio.embed);
    };
};