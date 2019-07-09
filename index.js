const { CordClient } = require("cordclient");

let client = new CordClient(require("./utils/config.js"));
client.registry.registerLanguages(require('path').join(__dirname, 'locales'));
client.registry.registerCommands(require('path').join(__dirname, 'commands'));
client.registry.registerEvents(require('path').join(__dirname, 'events'));

client.login();