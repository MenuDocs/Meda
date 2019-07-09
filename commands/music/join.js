const { CordCommand } = require("cordclient");
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "join",
            desc: "Joins your voice channel",
            group: "music",
        });
    };

    async run(message, args, client) {
        let player = message.guild.player

        if (player) return this.send(this.locale.get("commands.music.ac_player"), client.audio.embed);
        if (!message.member.voice.channel) return this.send(this.locale.get("commands.music.join_vc"), client.audio.embed);

        client.audio.join(message);
        return this.send(this.locale.get("commands.music.joined_vc").format([message.member.voice.channel.name]), client.audio.embed);
    };
}