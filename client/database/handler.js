const capitalize = require('../util/string').capitalize;
const mongoose = require('mongoose');
const Colored = require('betalogger').Colored;
const format = require('../util/string').format;
const config = require('../config');

class MongoHandler {
    onstructor(client) {
        this.client = client;
        this.config = config.database;

        let connection = mongoose.createConnection(this.uri, { useNewUrlParser: true });
        this.guild = connection.model('Guild', require('./guild'));
        this.log = new Colored({ process_color: 'green', process_name: 'DATABASE' });
        connection.on("ready", () => this.log.info('Connection Successful.'));
    };

    async createGuild(Guild) {
        this.log.watch("Created Guild Object: " + Guild);
        let data = Object.assign({ _id: mongoose.Types.ObjectId() }, Guild);
        let guild = new (this).guild(data);
        return guild.save();
    };

    async deleteGuild(id) {
        this.log.watch("Delted Guild Object: " + id);
        return await this.guild.deleteOne({ id });
    }

    async updateGuild(id, data) {
        this.log.pending("Update Guild Object: " + id + " (" + inspect(data, { depth: 0 }) + ")");
        let guild = await this.getGuild(id);
        if (typeof guild !== 'object') return;
        for (const key in data) {
            if (guild[key] !== data[key]) guild[key] = data[key];
            else return;
        }
        return await this.guild.updateOne({ id }, guild);
    };

    async getGuilds() {
        let guilds = await this.guild.find();
        return guilds;
    };

    async getGuild(id) {
        let guild = await this.guild.findOne({ id });
        if (!guild) guild = this.createGuild({ id });
        return guild;
    };
};

module.exports = MongoHandler;