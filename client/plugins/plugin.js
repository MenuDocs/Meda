let lower = text => text.toLowerCase();
class Plugin {
    constructor(parent, data) {

        this.parent = parent;

        this.name = data.name;
        this.process = data.process;
        this.cmd = this.process.cmd;
        this.event = this.process.event;

    }

    async run() {};
    async bind(client) {
        this.client = client;
        if (this.event) client.on(this.event, this.emdw.bind(null, this));
        if (this.cmd) client.on("cmdrun", this.cmdw.bind(null, this));
        if (!this.event && !this.cmd && this.process.now) this.run();
    };

    /**
     * Middeware for a CMD Plugin
     * MenuDocs Advanced. By: MeLike2D
     * @param {Object} command
     * @param {import('discord.js').Message} message
     * @param {String[]} args
     * @memberof Plugin
     */
    cmdw(plugin, command, message, args) {
        if (lower(command.config.name) != plugin.cmd) return;
        plugin.run(command, message, args)
            .then(async result => plugin.parent.emit('pluginSuccess', plugin, result, command, message, args))
            .catch(error => plugin.parent.emit("pluginError", plugin, error, command, message, args));
    };

    /**
     * Middleware for an Event Plugin;
     * MenuDocs Advanced. By: MeLike2D
     * @param {...} data
     * @memberof Plugin
     */
    emdw(plugin, ...data) {
        plugin.run(...data)
            .then(async result => plugin.parent.emit('pluginSuccess', plugin, result, ...data))
            .catch(error => plugin.parent.emit("pluginError", plugin, error, ...data));
    }
};

module.exports = Plugin;