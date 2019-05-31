module.exports = {
    name: "!userPerms",
    run: async (client, message, perms) => {
        let permsMapped = perms.map(perm => "`" + perm + "`").join(", ");
        return message.send(client.lang.get('events.message.no_user_perms').format([message.member, permsMapped]));
    }
}