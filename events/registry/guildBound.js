const { CordEvent } = require('cordclient');

module.exports = class extends CordEvent {
    constructor(client) {
        super(client, {
            name: 'guildBound',
            eventFor: 'registry'
        });
    };

    async run(command, message) {
        this.log.info(`${message.author.username} (${message.author.id}) ran a guild bound command (${command.name}).`);
        return message.channel.send(this.client.embed.message(`<:no:582718258008817674> ${command.name} **is a guild bound command.**`));
    };
};
