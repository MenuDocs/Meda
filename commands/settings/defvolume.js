const { CordCommand } = require('cordclient');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "defaultvolume",
            desc: "sets the default volume for music",
            usage: "[volume] [--reset]",
            group: "settings",
            aliases: ["defvol", "defvolume", "defaultvol", "dv"],
            botPerms: ["MANAGE_GUILD"],
            guildBound: true,
        });
    };

    async run(message, args, client) {
        let set = data => client.db.updateGuild(message.guild.id, data);
        let guild = await client.db.getGuild(message.guild.id);
        let defvolume = parseInt(args[0]);

        if (this.flags.includes('--reset')) return [this.send(this.locale.get("commands.settings.rst_volume")), set({ defvolume: 50 })];
        if (!defvolume) return this.send(this.locale.get("commands.settings.view_volume").format([guild.defvolume]));
        if (!defvolume.between(5, 100)) return this.send(this.locale.get("commands.music.volume_limit").format(["5-100"]));

        set({ defvolume });
        return this.send(this.locale.get("commands.settings.set_volume").format([defvolume]));
    };
};