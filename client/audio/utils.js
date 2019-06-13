/**
 * These are some utilities for audio embeds.
 * Courtesy of Duncan Sterkan for having his original java code open source 
 * 
 * @author Duncan Sterkan (duncte123): Original Version | MeLike2D: JavaScript Version
 * 
 * Link to original code: https://github.com/DuncteBot/SkyBot/blob/master/src/main/java/ml/duncte123/skybot/utils/MusicEmbedUtils.java
 */

const format = require('../util/string').format
module.exports = {

    /** 
     * This will generate a nice player embed for us
     * 
     * @param { import('./player') } player
     * @author Duncan Sterkan (duncte123)
     * @returns { String } the String that we can place in our embed
     */
    playerEmbed: player => {
        return (player.paused ? "\u23F8" : "\u25B6") + " " +
            module.exports.progressBar(player.state.position / player.current.length.millis) +
            `\`[${module.exports.formatTime(player.state.position)}/${module.exports.formatTime(player.current.length.millis)}]\`` +
            module.exports.getVolumeIcon(player.state.volume);
    },

    /**
     * This will calculate the progressbar for us
     *
     * @param { Number } percent how far we are in the audio track
     * @author Duncan Sterkan (duncte123)
     * @returns the progressbar
     */
    progressBar: percent => {
        let str = "";
        for (let i = 0; i < 8; i++) {
            if (i == Math.round(percent * 8)) {
                str += "\uD83D\uDD18"
            } else {
                str += "▬"
            }
        }
        return str
    },

    /**
     * This will give a nice emote depending on how loud we are sending the music
     *
     * @param { Number } volume the volume of our player
     * @author Duncan Sterkan (duncte123)
     * @returns the volume icon emote
     */
    getVolumeIcon: volume => {
        if (volume == 0) return "\uD83D\uDD07";
        else if (volume < 33) return "\uD83D\uDD08";
        else if (volume < 67) return "\uD83D\uDD09";
        else return "\uD83D\uDD0A";
    },

    /**
     * This wil format our current player time in this format: mm:ss
     *
     * @param { Number } time how far we are in the track
     * @author Duncan Sterkan (duncte123)
     * @returns our formatted time
     */
    formatTime: function(time) {
        var minutes = Math.floor(time / 60000);
        var seconds = ((time % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

}
