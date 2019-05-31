const utils = require('./utils');
class AudioTrack {
    constructor(LavalinkTrack) {
        this.requester = null;
        this.track = LavalinkTrack.track;
        this.votes = [];

        this.identifier = LavalinkTrack.info.identifier;
        this.isSeekable = LavalinkTrack.info.isSeekable;
        this.thumbnail = `https://i.ytimg.com/vi/${this.identifier}/mqdefault.jpg`
        this.author = LavalinkTrack.info.author;
        this.length = { parsed: LavalinkTrack.info.length.format(), millis: LavalinkTrack.info.length };
        this.title = LavalinkTrack.info.title;
        this.uri = LavalinkTrack.info.uri;
    };
};

module.exports = AudioTrack;