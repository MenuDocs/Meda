const escape = require('discord.js').Util.escapeMarkdown;
const capatalize = require('../util/string').capatalize;
const MessageEmbed = require('discord.js').MessageEmbed;
class MessageUtil {
    constructor(message) {

        this.message = message;
        this.client = message.client;
        this.embed = new(require('../classes/embed'))();

        this.embed.setDefaultEmbed(new MessageEmbed().setColor('RED'));

    };

    async logRoleAction(action, ...data) {
        let guild = await this.client.db.getGuild(data[0].guild.id);
        (guild.cases = ++guild.cases, guild.save());
        let channel = data[0].guild.channels.get(guild.logchannel);
        if (!channel) return;
        return channel.send(this.embed.message(`**❯ Role: ${data[1]} (\`${data[1].id}\`) \n❯ Member: ${data[0]} (\`${data[0].user.id}\`)\n❯ Moderator: ${data[2]} (\`${data[2].user.id}\`)\n❯ Reason:** ${escape(data[3])}`)
            .setTitle(`Mod Action: ${action.capatalize()} [Case: ${guild.cases}]`));
    };

    /* data = [member, moderator, reason] */
    async logKB(action, data) {
        let guild = await this.client.db.getGuild(data[0].guild.id);
        let channel = data[0].guild.channels.get(guild.logchannel);
        (guild.cases = ++guild.cases, guild.save());
        if (!channel) return;
        channel.send(this.embed.message(`**❯ Member: ${data[0]} (\`${data[0].user.id}\`)\n❯ Moderator: ${data[1]} (\`${data[1].user.id}\`)\n❯ Reason:** ${data[2]}`)
            .setTitle(`Action: ${action} [Case: ${guild.cases}]`));
    };

    async logUnban(data) {
        let guild = await this.client.db.getGuild(data[1].guild.id);
        let channel = data[1].guild.channels.get(guild.logchannel);
        (guild.cases = ++guild.cases, guild.save());
        if (!channel) return;
        channel.send(this.embed.message(`**❯ Member: \`${data[0]}\`\n❯ Moderator: ${data[1]} (\`${data[1].user.id}\`)\n❯ Reason:** ${data[2]}`)
            .setTitle(`Action: Unban [Case: ${guild.cases}]`));
    };

    /* data = [channel, moderator, deleted, reason] */
    async logPurge(data) {
        let guild = await this.client.db.getGuild(data[1].guild.id);
        let channel = data[1].guild.channels.get(guild.logchannel);
        (guild.cases = ++guild.cases, guild.save());
        if (!channel) return;
        channel.send(this.embed.message(`**❯ Channel: \`${data[0]}\`\n❯ Moderator: ${data[1]} (\`${data[1].user.id}\`)\n❯ Amount: \`${dat0[3].size}\`\n❯ Reason:** ${data[2]}`)
            .setTitle(`Action: Unban [Case: ${guild.cases}]`));
    }
};

module.exports = MessageUtil;