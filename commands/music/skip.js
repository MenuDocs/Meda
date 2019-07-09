const { CordCommand } = require("cordclient");
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "skip",
            desc: "skips the current song.",
            group: "music",
            guildBound: true
        });
    };

    async run(message, args, client) {
        let player = message.guild.player;        
        let required = Math.round((player.channel.members.filter(m => !m.user.bot)).size / 2);

        if (!player) return this.send(this.locale.get("commands.music.no_player"), client.audio.embed);
        if (!player.channel.members.has(message.author.id)) return this.send(this.locale.get("commands.music.!in_my_vc"), client.audio.embed);
        if (player.current.requester === message.author.id) return player.stop();

        if (player.channel.members.filter(m => !m.user.bot).size > 2) {
            if (player.current.votes.includes(message.author.id)) return this.send(this.locale.get('commands.music.already_voted').format([message.member]), client.audio.embed);
            player.current.votes.push(message.author.id);
            if (player.current.votes.length >= required) return player.stop()
            return this.send(this.locale.get('commands.music.skip_voted'), client.audio.embed)
        }

    };
};