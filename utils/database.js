const { uri } = require('./config.js')
const mongo = require('mongoose');
class MedaDB {
    constructor() {
        this._ = mongo.createConnection(uri, { useNewUrlParser: true });
        this.guild = this._.model("Guild", require('../models/guild'));
        this.player = this._.model("Player", require('../models/player'));
    };

    createGuild(Guild) {
        let data = Object.assign({ _id: mongo.Types.ObjectId() }, Guild);
        let guild = new (this).guild(data);
        return guild.save();
    };

    async updateGuild(id, data) {
        let guild = await this.getGuild(id);
        if (typeof guild !== 'object') return;
        for (const key in data) {
            if (guild[key] !== data[key]) guild[key] = data[key];
            else return;
        }
        return await this.guild.updateOne({ id }, guild);
    };

    async getGuild(id, path = false) {
        let guild = await this.guild.findOne({ id });
        if (!guild) guild = this.createGuild({ id });
        return path ? guild[path] : guild;
    };

    async createUser(User) {
        let data = Object.assign({ _id: mongo.Types.ObjectId() }, User);
        let user = new (this).user(data);
        return user.save();
    };

    async updateUser(id, data) {
        let user = await this.getUser(id);
        if (typeof guild !== 'object') return;
        for (let key in data) {
            if (user[key] !== data[key]) user[key] = data[key];
            else return
        };
        return await this.user.updateOne({ id }, data);
    };

    async getUser(id, path = false) {
        let guild = await this.user.findOne({ id });
        if (!guild) guild = this.createUser({ id });
        return path ? guild[path] : guild;
    };

}

module.exports = MedaDB;