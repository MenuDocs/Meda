module.exports = class extends require('../client/plugins/plugin') {
    constructor(parent) {
        super(parent, {
            name: 'muteHandler',
            process: {
                now: true
            }
        });
    };

    removeMute(guild, mute) {
        let lodash = require('lodash');
        lodash.remove(guild.mutes, m => m.user === mute.user);
        return guild.save();
    };

    async check() {
        this.client.db.getGuilds().then(async guilds => {
            guilds.forEach(async guild => {
                if (!Array.isArray(guild.mutes) || !guild.mutes[0]) return;
                for (const mute of guild.mutes) {
                    let member = client.guilds.get(guilds.id).members.get(mute.user);
                    if (Date.now() < mute.time) continue;
                    if (!guild.muterole) continue;
                    this.removeMute(guild, mute);
                    member.removeRole(guild.muterole, "Times up");
                }
            });
        });
    }

    async run() { setInterval(async () => await this.check(), 15000); };
};