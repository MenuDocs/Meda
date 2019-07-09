const { CordCommand } = require('cordclient');
const { remove } = require('lodash');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "remove",
            desc: "removes a song from the queue.",
            usage: "[index]",
            group: "music",
            guildBound: true,
        });
    };

    async run(message, args, client) {
        let player = message.guild.player;
        let choice = parseInt(args[0] - 1);

        if (!player) return this.send(this.locale.get('commands.music.no_player'), client.audio.embed);
        if (!player.channel.members.has(message.author.id)) return this.send(this.locale.get('commands.music.!in_my_vc'), client.audio.embed);
        if (isNaN(choice) || player.next.length < Number(choice) + 1) return this.send(`**<:no:582718258008817674> Provide an existing song.**`, client.audio.embed);
        if (player.next[choice].requester !== message.author.id) return this.send(this.locale.get('commands.music.didnt_request'), client.audio.embed);

        try {
            let song = player.next[choice];
            await remove(player.next, (t, i, n) => i === choice);
            return this.send(this.locale.get("commands.music.song_removed").format([song.title, song.uri]), client.audio.embed);
        } catch (error) {
            audio.log.error(`Ran into an error: ${e}`);
            return message.send(this.locale.get("commands.music.error").format([e]));
        }
    };
};