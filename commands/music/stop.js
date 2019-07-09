const { CordCommand } = require('cordclient');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: 'stop',
            desc: 'stops & destroys the current player.',
            group: 'music',
        });
    };

    async run(message, args, client) {
        let vc = message.member.voice.channel;
        let audio = client.audio;
        let player = audio.get(message.guild.id);

        if (!player) return this.send(this.locale.get('commands.music.no_player'), audio.embed);
        if (!vc || !vc.members.has(client.user.id)) return this.send(this.locale.get('commands.music.!in_my_vc'), audio.embed);

        return await audio.disconnect(message);
    };
}