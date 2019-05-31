const utils = require('../../client/index.js');
const RichEmbed = require('discord.js').MessageEmbed;
module.exports = {
    name: "ready", 
    run: async client => {
        /** Getting the Utils */
        client.db = new utils.MongoHandler(client);
        client.log = new utils.Colored({process_name:"MENUDOCS", process_color: "blue"});
        client.find = new utils.FinderUtil();
        client.lang = utils.Language;
        client.embed = new utils.EmbedUtil();
        client.audio = new utils.AudioUtil(client);
        client.plugins = new utils.PluginHandler(client);

        /** Presence */
        client.user.setActivity("[MenuDocs]", {type: "WATCHING"});

        /** Logging */
        client.log.info("Logged In.");

        /** Utility Setup */
        client.embed.setDefaultEmbed(new RichEmbed().setColor("203145").setFooter("[MenuDocs] Advanced").setTimestamp(new Date()));
        client.plugins.load();
    }
}