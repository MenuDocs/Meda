module.exports = {
    name: "!botPerms",
    run: async (client, message, perms) => {
        let permsMapped = perms.map(perm => "`" + perm + "`").join(", ");
        return message.send(client.lang.get('events.message.no_bot_perms').format([message.member, permsMapped]));
    }
}