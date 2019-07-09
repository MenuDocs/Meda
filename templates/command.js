const { CordCommand } = require('cordclient');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "",
            desc: "",
            nfsw: false,
            usage: "",
            group: "",
            aliases: [],
            botPerms: [],
            userPerms: [],
            guildBound: false,
            ownerBound: false
        });
    };

    async run(message, args, client) {};
};