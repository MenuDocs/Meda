module.exports = {
    name: "noInvites",
    run: async (client, message, args) => {
        return message.send(client.lang.get('events.message.no_invites').format([message.member]));
    }
}