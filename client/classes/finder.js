const {
    Guild,
    GuildMember,
    GuildChannel,
    User,
    MessageMentions,
    Role,
    Client
} = require('discord.js');
/**
 * FinderUtil for discord Stuff!
 * Implemented in version hryra.js@1.5.2
 *
 * @class FinderUtil
 * @author MeLike2D of DefyDevelopmentss
 * @version HryraUtils-1.6.1
 * @license GPL-3.0 - and DefyDevelopments of 2DApplications 2017
 */

module.exports = class FinderUtil {
    /**
     * Searches for a Guild by ID/Name
     * @param {Number|String} query - ID/Name
     * @param {Client} client - Where to find the Guild
     * @returns {Promise<Guild>} - Guild
     * @memberof FinderUtil - Class by MeLike2D
     */

    async guild(query, client) {
        return new Promise((resolve, reject) => {
            try {
                if (!query) resolve(false);
                else if (!client) resolve(false);
                const regex = /[<@$%#>]/g;
                if (!isNaN(query)) resolve(client.guilds.get(query));
                else if (typeof (query) === 'string') resolve(client.guilds.find(g => g.name === query));
                else reject(new TypeError('Query !== | Number (ID) | String (ID)'));
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Searches for a Member in a guild by Mention/ID/Name
     * @param {MessageMentions|Number|String} query - Mention/ID/Name
     * @param {Guild} guild - Where to Find the Member
     * @returns {Promise<GuildMember>} - Member
     * @memberof FinderUtil - Class by MeLike2D
     */

    async member(query, guild) {
        return new Promise((resolve, reject) => {
            try {
                if (!query) resolve(false);
                else if (!guild) resolve(false);
                const regex = /[<@!$%#>]/g;
                if (regex.test(query)) resolve(guild.members.get(query.replace(regex, '')));
                else if (!isNaN(query)) resolve(guild.members.get(query));
                else if (typeof (query) === 'string') resolve(guild.members.find(m => m.user.username === query || m.nickname === query));
                else resolve(false);
            } catch (error) {
                console.debug(error);
                reject(error);
            }
        });
    }

    /**
     * Searches for a User by Mention/ID/Name
     * @param {MessageMentions|Number|String} query - Mention/ID/Name
     * @param {Client} client - Where to Find the User
     * @returns {Promise<User>} - User
     * @memberof FinderUtil - Class by MeLike2D
     */

    async user(query, client) {
        return new Promise((resolve, reject) => {
            try {
                if (!query) resolve(false);
                else if (!client) resolve(false);
                const regex = /[<@$%#>]/g;
                if (regex.test(query)) resolve(client.users.get(query.replace(regex, '')));
                else if (!isNaN(query)) resolve(client.users.get(query));
                else if (typeof (query) === 'string') resolve(client.users.find(u => u.username === query));
                else resolve(false);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Searches for a Channel in a Guild by Mention/ID/Name
     * @param {MessageMentions|Number|String} query - Mention/ID/Name
     * @param {Guild} guild - Where to Find the Channel
     * @returns {Promise<GuildChannel>} - Channel
     * @memberof FinderUtil - Class by MeLike2D
     */

    async channel(query, guild) {
        return new Promise((resolve, reject) => {
            try {
                if (!query) resolve(false);
                else if (!guild) resolve(false);
                const regex = /[<@$%#>]/g;
                if (regex.test(query)) resolve(guild.channels.get(query.replace(regex, '')));
                else if (!isNaN(query)) resolve(guild.channels.get(query));
                else if (typeof (query) === 'string') resolve(guild.channels.find(c => c.name === query));
                else resolve(false);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Searches for a Role in a Guild by Mention/ID/Name
     *
     * @param {MessageMentions|Number|String} query - Mention/ID/Name
     * @param {Guild} guild - Where to Find the Role
     * @returns {Promise<Role>} - Role
     * @memberof FinderUtil - Util by MeLike2D
     */

    async role(query, guild) {
        return new Promise((resolve, reject) => {
            try {
                if (!query) resolve(false);
                else if (!guild) resolve(false);
                const regex = /[<@$%#>]/g;
                if (regex.test(query)) resolve(guild.roles.get(query.replace(regex, '')));
                else if (!isNaN(query)) resolve(guild.roles.get(query));
                else if (typeof (query) === 'string') resolve(guild.roles.find(r => r.name === query));
                else resolve(false);
            } catch (error) {
                reject(error);
            }
        });
    }
};