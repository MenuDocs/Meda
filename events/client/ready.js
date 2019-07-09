const { MessageEmbed } = require('discord.js');
const { CordEvent } = require('cordclient');
const MedaAudio = require('../../audio/index')
const config = require('../../utils/config.js').audio;
const MedaDB = require('../../utils/database');
require('../../utils/protos');

module.exports = class extends CordEvent {
    constructor(client) {
        super(client, {
            name: 'ready'
        });
    };

    async run() {      
        let client = this.client;
        client.log.info(`Logged In... ${this.registry.commands.size} Commands.`);

        client.embed.setDefault(new MessageEmbed().setColor('BLUE'));
        client.embed.addEmbed('audio', new MessageEmbed(this.locale.get('commands.music.embed')));

        client.db = new MedaDB();
        client.audio = new MedaAudio(client, config);

        client.user.setActivity('Music with Lavalink!', { type: 'PLAYING' });
        this.registry.registerPresence(15000, ["WATCHING|[ MenuDocs ]", "WATCHING|for a!help", "PLAYING|Music with Lavalink!"]);

    };
};
