module.exports = {
    name: "validChannel",
    run: async (client, message, channel) => {
        return message.send(client.lang.get('events.message.no_invites').format([message.member, channel]));
    }
}