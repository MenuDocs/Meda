module.exports = {
    name: "ownerOnly",
    run: async (client, command, message) => {
        console.log(command);
        return message.send(client.lang.get('events.message.owner_only').format([message.member, command.config.name.capitalize()]));
    }
}   