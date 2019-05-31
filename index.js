const { Client, Collection, Message } = require('./client/index');
const { token } = require('./client/config').discord;
const client = new Client();

["event", "command"].forEach(x => require(`./handlers/${x}`)(client));
["aliases", "commands"].forEach(x => client[x] = new Collection());

client.login(token);