const glob = require('glob');
const Emitter = require('events').EventEmitter;
const Colored = require('betalogger').Colored;
const Collection = require('discord.js').Collection;
class PluginManager extends Emitter {
    constructor(client) {
        super();

        this.log = new Colored({process_name: 'PLUGINS', process_color: "magenta"});
        this.client = client;
        this.plugins = new Collection();;

        this.on('pluginError', this._pluginError.bind(null, this));
        this.on('pluginSucess', this._pluginSuccess.bind(null, this));
    };

   get(name, prop) {
       if(!prop) return this.plugins.get(name);
       else return this.plugins.get(name)[prop];
   }
    
    async load(file="**/*") {
        if(file == "**/*") this.plugins.clear();
        glob(`./plugins/${file}.js`, async (error, plugins) => {
            if(error) this.emit('loadError', this, error);
            plugins.forEach(path => {
                let plugin = new (require(`../../${path}`))(this, this.client);
                plugin.path = require('path').join(path);
                plugin.bind(this.client);
                this.plugins.set(plugin.name, plugin)
            });
            return this.log.info(`Loaded ${plugins.length} Plugins.`);
        });
    };

    _pluginError(manager, plugin, error) {
        return manager.log.error(`${plugin.name}: ${error}`);
    };

    _pluginSuccess(manager, plugin, result) {
        delete require.cache[require.resolve(`../../${plugin.path}`)];
        manager.plugins.delete(plugin.name);
        manager.load((plugin.path.split('/'))[0]);
        this.emit('pluginNeedsReload', (plugin) => this.load((plugin.path.split('/'))[0]));
        return manager.log.info(`${plugin.name} Finished`);
    }

}

module.exports = PluginManager;