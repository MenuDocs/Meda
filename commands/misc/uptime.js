const { CordCommand } = require('cordclient');
module.exports = class extends CordCommand {
    constructor(client) {
        super(client, {
            name: "uptime",
            desc: "Displays the bots uptime.",
            group: "misc",
        });
    };

    async run(message, args, client) {
        this.send(uptime(client.uptime));
    }
}
const uptime = ms => {
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (1000 * 60)) % 60).toString();
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 24).toString();
    const days = Math.floor(ms / (1000 * 60 * 60 * 24)).toString();
    return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds.`;
}