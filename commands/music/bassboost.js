const { CordCommand } = require('cordclient');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "bassboost",
            desc: "changes the amount of bass boost for the player",
            usage: "[max|med|low|none]",
            group: "music",
            aliases: ['bb'],
            guildBound: true,
        });
    };

    async run(message, args, client) {
        let player = client.audio.get(message.guild.id);

        if (!player) return this.send(this.locale.get('commands.music.no_player'), client.audio.embed);
        if (!args[0]) return this.send(this.locale.get('commands.music.cur_basslvl').format([player.basslvl.capitalize()]), client.audio.embed);
        if (!player.channel.members.has(message.author.id)) return this.send(this.locale.get('commands.music.!in_my_vc'), client.audio.embed);
        if (!['max', 'med', 'low', 'none'].includes(args[0])) return this.send(this.locale.get('commands.music.bass_levels'), client.audio.embed);

        player.filter('bassboost', args[0]);
        return this.send(this.locale.get("commands.music.new_basslvl").format([args[0].capitalize()]), client.audio.embed)
    };
};