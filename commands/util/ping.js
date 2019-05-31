module.exports = {
    config: {
        name: "ping",
        desc: "displays the bots latency",
        group: "util",
        usage: "",
        aliases: ["pong"],
        guildOnly: false,
        ownerOnly: false,
        userPerms: [],
        clientPerms: [],
    },

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let random = ["Is this really my ping?", "Is it bad? I cant look.", "Dont tell me... its probably bad."][Math.floor(Math.random() * 3)]
        let msg = await message.channel.send(`*${random}*\n**Bot: \`${Math.round(client.ping)}ms\`**`);
        msg.edit(`*${random}*\n**Bot: \`${Math.round(client.ping)}ms\` API: \`${msg.createdTimestamp-message.createdTimestamp}ms\`**`);
    }
}