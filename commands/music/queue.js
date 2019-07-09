const { CordCommand } = require('cordclient');
const { formatTime } = require('../../audio/util');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "queue",
            desc: "shows the queue for the current player.",
            group: "music",
            aliases: [ "q" ],
            guildBound: true
        });
    };

    async run(message, args, client) {
        let player = message.guild.player;

        if (!player) return this.send(this.locale.get('commands.music.no_player'), client.audio.embed);
        if (!player.current) return this.send(this.locale.get('commands.music.queue_empty'), client.audio.embed);
        if (!isNaN(args[0]) && player.next.length >= args[0] && args[0] > 0) {
            let song = player.next[parseInt(args[0] - 1)];
            return this.send(`**[${song.title}](${song.uri})\nRequested By: <@${song.requester}>**`, client.audio.embed);
        }

        let length = 0
        let queue = `**\`${formatTime(player.current.length)}\` Current: [${player.current.title.trunc(40, true)}](${player.current.uri})**\n\n`;
        player.next.slice(0, 10).map((song, index) => queue += `\`${formatTime(song.length)}\` **${++index}. [${song.title.trunc(40, true)}](${song.uri})**\n`);
        for (let song of [ ...player.next, player.current ]) length = length + song.length;
        return this.send(queue, client.audio.embed, { footer: { text: `Meda • Queue Length: ${formatTime(length)}` } });
    };
};
