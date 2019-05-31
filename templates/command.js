const { format, capatalize } = require('../../client/index').StringUtils;
module.exports = {
    config: {
        name: "",
        desc: "",
        group: "",
        usage: "",
        aliases: [],
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
        
    }
}