const { CordEvent } = require('cordclient');

module.exports = class extends CordEvent {
    constructor(client) {
        super(client, {
            name: 'guildDelete'
        });
    };

    async run(guild) { 
        await this.client.db.deleteGuild(guild.id);
        return this.log.info(`Left Guild: ${guild.name} (${guild.id})`)
    };
};
