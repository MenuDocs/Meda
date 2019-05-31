module.exports = {
    name: "guildOnly",
    run: async (client, command, message) => {
        return message.send(client.lang.get('events.message.guild_only').format([message.member, command.config.name.capitalize()]));
    }
}