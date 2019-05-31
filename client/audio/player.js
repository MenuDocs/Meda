const Player = require('discord.js-lavalink').Player;
module.exports = class AudioPlayer extends Player {
    constructor(node, options) {
        super(node, options)
        this.next = [];
        this.last = [];
        this.reqs = new Map();
        this.repeat = false;
        this.current = null;
        this.message = null;
        this.basslvl = 'none';
    }
};