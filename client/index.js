module.exports = {
    Client: require('discord.js').Client,
    Config: require('./config.js') || require('./util/config.js'),
    Colored: require('betalogger').Colored,
    Message: require('./classes/message'),
    Language: require('./classes/language.js'),
    AudioUtil: require('./audio/manager.js'),
    EmbedUtil: require('./classes/embed.js'),
    Collection: require('discord.js').Collection,
    FinderUtil: require('./classes/finder.js'),
    StringUtils: require('./util/string.js'),
    MongoHandler: require('./database/handler.js'),
    EventEmitter: require('events').EventEmitter,
    PlayerManager: require('discord.js-lavalink').PlayerManager,
    PluginHandler: require('./plugins/manager.js')
}

module.exports.Language.load();

module.exports.format = module.exports.StringUtils['format'];
module.exports.between = Number.prototype.between = function (...numbers) {
    let [min, max] = [...numbers];
    if (parseInt(this) > max || parseInt(this) < min) return false;
    else return true;
};
module.exports.round = Number.prototype.round = function () { return Math.ceil(parseInt(this)) } ;
module.exports.capitalize = module.exports.StringUtils['capitalize'];