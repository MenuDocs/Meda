module.exports = {
    config: {
        name: 'shutdown',
        desc: 'correctly shuts off the bot',
        group: 'owner',
        usage: "",
        aliases: [],
        guildOnly: false,
        ownerOnly: true,
        userPerms: [],
        clientPerms: []
    },

    run: async (client, message, args) => {

        if(client.audio) await client.audio.lavalink.players.forEach(player => client.audio.lavalink.leave(player.id));
        await message.send(`**Shutting Down...**`);
        process.exit(0);

    }
};