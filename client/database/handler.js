const mongoose = require('mongoose');
const Colored = require('betalogger').Colored;
const config = require('../config');

class MongoHandler {
    constructor(client) {
			this.client = client;
            this.connection = mongoose.createConnection(config.uri, { useNewUrlParser: true });
            this.guild = this.connection.model("Guild", require('./models/guild'));
    };

    async createGuild(Guild) {
        let data = Object.assign({ _id: mongoose.Types.ObjectId() }, Guild);
        let guild = new (this).guild(data);
        return guild.save();
    };

    async deleteGuild(id) {
        return await this.guild.deleteOne({ id });
    }

    async updateGuild(id, data) {
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

    async getGuild(id, path = false) {
        let guild = await this.guild.findOne({ id });
        if (!guild) guild = this.createGuild({ id });
		if (path && guild[path]) return guild[path];
        return guild;
    };

    async createUser(User) {
        let data = Object.assign({ _id: mongoose.Types.ObjectId() }, User);
        let user = new (this).user(data);
        return user.save();
    };

    async deleteUser(id) {
        return await this.user.deleteOne({ id });
    };
};

module.exports = MongoHandler;