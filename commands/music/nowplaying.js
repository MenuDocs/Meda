const Util = require('../../audio/util');
const { CordCommand } = require('cordclient');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "nowplaying",
            desc: "view the current playing song",
            group: "music",
            aliases: ["np"],
            guildOnly: true
        });
    };

    async run(message, args, client) {
        let player = client.audio.get(message.guild.id);

        if (!player) return this.send(this.locale.get('commands.music.no_player'), client.audio.embed);
        if (!player.current) return this.send(this.locale.get('commands.music.no_current_song'), client.audio.embed);
        let current = player.current;

        let np = `**[${current.title}](${current.uri}) [<@${current.requester}>]**\n`
        np += Util.playerEmbed(player);
        this.send(np, client.audio.embed);
    };
};
