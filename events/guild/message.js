let c = require('../../client/index').Config.discord;
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
module.exports = {
    name: "message",

    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').Message} message
     */
    run: async (client, message) => {
        let info = {
            prefix: 'a!'
        };

        if (message.author.bot) return;
        if (message.guild) info = await client.db.getGuild(message.guild.id);
        if (message.guild && info.invitefilter && parseMessage(message)) return client.emit('noInvites', message, args);
        if (!new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(info.prefix)})\\s*`).test(message.content)) return;

        let [, matchedPrefix] = message.content.match(new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(info.prefix)})\\s*`));
        let args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        let cmd = args.shift().toLowerCase();

        let command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (!command) return;
        let config = command.config;


        if (!inValidChannel(message, info)) return client.emit("!validChannel", message, client.guild.channel(info.cmdchannel));
        if (config.guildOnly && message.channel.type === "dm") return client.emit("guildOnly", command, message);
        if (config.ownerOnly && !c.owners.includes(message.author.id)) return client.emit('ownerOnly', command, message);
        if (config.userPerms.length != 0 && !message.member.hasPermission("ADMINISTRATOR") && !c.owners.includes(message.author.id)) {
            let missing = message.member.permissions.missing(config.userPerms);
            if (missing && missing.length != 0) return client.emit("!userPerms", message, missing);
        };
        if (config.userPerms.length != 0 && !message.guild.me.hasPermission("ADMINISTRATOR")) {
            let missing = message.guild.me.permissions.missing(config.userPerms);
            if (missing && missing.length != 0) return client.emit("!botPerms", message, missing);
        };

        message.prefix = info.prefix;
        await command.run(client, message, args)
        client.emit('cmdrun', command, message, args)
    }
}

/**
 * Discord Invite Regex
 * @author Connor Strand, Edited by MeLike2D
 * @param {import('discord.js').Message} m 
 */

function parseMessage(m) {
    try {
        let regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/ig.test(m.cleanContent);
        if (regex) return true;
    } catch (error) {
        console.error(error);
    }
}

function inValidChannel(message, guild) {
    let channel = guild.cmdchannel;
    if (!message.guild) return;
    if (message.member.permissions.has(`MANAGE_GUILD`)) return true;
    if (channel != 0 && message.channel.id != channel) return false;
    return true
};