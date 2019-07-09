const { CordEvent } = require('cordclient');

module.exports = class extends CordEvent {
    constructor(client) {
        super(client, {
            name: 'guildCreate'
        });
    };

    async run(guild) { 
        await client.db.getGuild(guild.id);
        return this.log.info(`Joined Server: ${guild.name} (${guild.id})`);
    };
};
