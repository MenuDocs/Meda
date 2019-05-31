const YTApi = require('simple-youtube-api');
const fetch = require('node-fetch');
const format = require('../util/string').format;
const config = require('../config.js');
const Client = require('discord.js').Client;
const Colored = require('betalogger').Colored;
const Message = require('discord.js').message;
const RichEmbed = require('discord.js').MessageEmbed;
const EmbedUtil = require('../classes/embed');
const capitalize = require('../util/string').capitalize;
const AudioTrack = require('./track');
const AudioPlayer = require('./player');
const PlayerManager = require('discord.js-lavalink').PlayerManager;

/**
 * Audio Manager for MenuDocs Advanced.
 *
 * @class AudioManager
 * @author MeLike2D
 */
class AudioManager {
    /**
     * Creates an instance of AudioManager.
     * 
     * @param {Client} client
     * @memberof AudioManager
     */
    constructor(client) {
        this.db = client.db     
        this.api = new YTApi(config.apis.google);
        this.log = new Colored({ process_name: "MENUPLAYER", process_color: "red" });
        this.lang = client.lang;
        this.embed = new EmbedUtil();
        this.embed.setDefaultEmbed(new RichEmbed(client.lang.get('commands.music.embed')));
        this.client = client;
        this.config = config.music;
        this.lavalink = new PlayerManager(client, this.config.nodes, { Player: AudioPlayer });

        this.log.info("Connected Successfully...");
    };

    /**
     * Returns   the PlayerManager
     * MenuDocs Advanced. By: MeLike2D
     * 
     * @readonly
     * @memberof AudioManager
     */
    get parent() {
        return this.lavalink;
    }

    /**
     * Gets a player
     * MenuDocs Advanced. By: MeLike2D
     * 
     * @param {string} id   
     * @returns
     * @memberof AudioManager
     */
    get(id) {
        return this.lavalink.players.get(id);
    }

    /**
     * Creates a Lavalink PLayer
     * MenuDocs Advanced. By: MeLike2D
     * 
     * @param {Message} message
     * @returns {Promise<AudioPlayer>}
     * @memberof AudioManager
     */
    async join(message) {
        return new Promise(async (resolve, reject) => {
            try {
                let Player = this.lavalink.join({
                    host: this.config.host,
                    guild: message.guild.id,
                    channel: message.member.voice.channel.id
                });
                Player.volume(await this.db.getGuild(message.guild.id, 'defvolume'));
                resolve(Player);
            } catch (error) {
                this.log.error(`Ran into an error: ${error}`);
                message.send(this.lang.get('commands.music.error').format([error]), this.embed);
                reject(error);
            }
        });
    };


    /**
     * Destroys a Lavalink Player
     * MenuDocs Advanced. By: MeLike2D
     * 
     * @param {message} message
     * @returns {Promise<undefined>}
     * @memberof AudioManager
     */
    async leave(message) {
        return new Promise(async (resolve, reject) => {
            try {
                message.send(`**<:yes:582718257807622154> Finshed the queue.**`, this.embed);
                this.lavalink.leave(message.guild.id);
                resolve(true);
            } catch (error) {
                this.log.error(`Ran into an error: ${error}`);
                message.send(this.lang.get('commands.music.error').format([error]), this.embed);
                reject(error);
            }
        });
    }


    /**
     *  Advanced. By: MeLike2D
     * Searches youtube with the given query
     * MenuDocs
     * @param {string} query
     * @param {number} [max=1]
     * @memberof AudioManager
     */
    async ytSearch(message, query, max = 1) {
        let tracks = [];
        return new Promise(async (resolve, reject) => {
            try {
                let videos = await this.api.searchVideos(query, max);
                for (let video in videos) {
                    let track = await this.lavaSearch(message, `https://youtube.com/watch?v=${videos[video].id}`, 1);
                    if (!track) return;
                    tracks.push(track);
                };
                resolve(tracks);
            } catch (error) {
                this.log.error(`Ran into an error: ${error}`);
                reject(error);
            }
        });
    }

    /**
     * Lavalink searches with the given query
     * MenuDocs Advanced. By: MeLike2D
     * 
     * @param {string} query
     * @param {number} [max=1]
     * @returns {Promise<AudioTrack[]>}
     * @memberof Audio
     */
    async lavaSearch(message, query, max = 1) {
        return new Promise(async (resolve, reject) => {
            let newtra = [];
            let headers = { authorization: this.config.pass };
            fetch(`http://${this.config.host}:${this.config.port}/loadtracks?identifier=${query}`,  { headers })
                .then(res => res.json())
                .then(res => {
                    let tracks = res.tracks;
                    switch (res.loadType) {
                        case 'TRACK_LOADED':
                            resolve(new AudioTrack(tracks[0]));
                            break;
                        case 'PLAYLIST_LOADED':
                            let playlist = tracks.slice(0, max);
                            playlist.forEach(t => newtra.push(new AudioTrack(t)));
                            newtra.unshift(res.playlistInfo);
                            resolve(newtra);
                            break;
                        case 'SEARCH_RESULT':
                            tracks.slice(0, max).forEach(t => newtra.push(new AudioTrack(t)));
                            resolve(newtra);
                            break;
                        case 'NO_MATCHES':
                            if(max == 1) message.send(this.lang.get('commands.music.load_error').format([res.exception.severity.capitalize(), res.exception.message]), this.embed)
                            resolve(false);                            
                            break;
                        case 'LOAD_FAILED':
                            if(max == 1) message.send(this.lang.get('commands.music.load_error').format([res.exception.severity.capitalize(), res.exception.message]), this.embed)
                            resolve(false);
                            break;
                    };
                });
        });
    };


    /**
     * Handles a track.
     * MenuDocs Advanced. By: MeLike2D
     * 
     * @param {AudioTrack} track
     * @param {message} message
     * @returns {Promise<undefined>}
     * @memberof AudioManager
     */
    async handleTrack(track, message) {
        let player = this.get(message.guild.id);
        return new Promise(async (resolve, reject) => {
            try {
                player.reqs.set(track.track, message.author.id);
                if (!player.current) {
                    player.message = message;
                    player.current = track;
                    this.play(track, message);
                } else {
                    player.next.push(track);
                    return message.channel.send(this.embed.message(this.lang.get('commands.music.enqueued_song').format([track.title])).setThumbnail(track.thumbnail));
                };
            } catch (error) {
                this.log.error(`Ran into an error: ${error}`);
                message.send(this.embed.message(this.lang.get('commands.music.error').format([error])), this.embed);
                reject(error);
            };
        });
    };


    /**
     * Plays a track in a guild
     * MenuDocs Advanced. By: MeLike2D
     * 
     * @param {AudioTrack} song
     * @param {Message} message
     * @returns {Promise<undefined>}
     * @memberof AudioManager
     */
    async play(track, message) {
        let player = this.get(message.guild.id);
        if (!track) return;
        if (!player) return;
        try {
            player.play(track.track);
            player.on('end', async d => {   
                if (d.reason == 'REPLACED') return;
                if (d.reason == 'LOAD_FAILED') return message.send(this.lang.get('commands.music.load_failed'), this.embed);
                if (!player.repeat) {
                    player.last.unshift(player.current);
                    player.current = player.next[0];
                    player.next.shift();
                };
                if (!player.current) return await this.leave(message);
                await player.play(player.current.track);
                return message.channel.send(this.embed.message(this.lang.get('commands.music.playing_track').format([player.current.title])).setThumbnail(player.current.thumbnail));
            });
            return message.channel.send(this.embed.message(this.lang.get('commands.music.playing_track').format([player.current.title])).setThumbnail(player.current.thumbnail));
        } catch (error) {
            this.log.error(`Ran into an error: ${error}`);
            return message.send(this.lang.get('commands.music.error').format([error]), this.embed);
        };
    }


    /**
     * Resumes a player.
     * MenuDocs Advanced. By: MeLike2D
     * 
     * @param {String} id
     * @returns {Promise<AudioPlayer>}
     * @memberof AudioManager
     */
    async resume(message) {
        let player = this.get(message.guild.id);
        return new Promise(async (resolve, reject) => {
            try {
                player.pause(false);
                resolve(player);
            } catch (error) {
                this.log.error(`Ran into an error: ${error}`);
                message.send(this.lang.get('commands.music.error').format([error]), this.embed);
                reject(error);
            };
        });
    };

    /**
     * Pauses a player.
     * MenuDocs Advanced. By: MeLike2D
     * 
     * @param {Message} message
     * @returns {Promise<AudioPlayer>}
     * @memberof AudioManager
     */
    async pause(message) {
        let player = this.get(message.guild.id);
        return new Promise(async (resolve, reject) => {
            try {
                player.pause(true);
                resolve(player);
            } catch (errsor) {
                this.log.error(`Ran into an error: ${error}`);
                message.send(this.lang.get('commands.music.error').format([error]), this.embed);
                reject(error);
            };
        });
    };


    /**
     * Sets the volume of a player
     * MenuDocs Advanced. By: MeLike2D
     * 
     * @param {Message} message
     * @param {Number} volume
     * @returns {Promise<AudioPlayer>}
     * @memberof AudioManager
     */
    async volume(message, volume) {
        let player = this.get(message.guild.id);
        return new Promise(async (resolve, reject) => {
            try {
                player.volume(volume);
                resolve(player)
            } catch (error) {
                this.log.error(`Ran into an error: ${error}`);
                message.send(this.lang.get('commands.music.error').format([error]), this.embed);
                reject(error);
            };
        });
    };

    /**
     * Skips the current song
     * MenuDocs Advanced. By: MeLike2D
     * 
     * @param {Message} message
     * @returns {Promise<AudioPlayer>}
     * @memberof AudioManager
     */
    async skip(message) {
        return new Promise(async (resolve, reject) => {
            let player = this.get(message.guild.id);
            try {
                player.stop();
                resolve(player);
            } catch (error) {
                this.log.error(`Ran into an error: ${error}`);
                message.send(this.lang.get('commands.music.error').format([error]), this.embed);
                reject(error);
            };
        });
    };

    /**
     * Plays the previous song
     * MenuDocs Advanced. By: MeLike2D
     * 
     * @param {Message} message
     * @returns {Promise<AudioPlayer>}
     * @memberof AudioManager
     */
    async previous(message) {
        return new Promise(async (resolve, reject) => {
            let player = this.get(message.guild.id);
            try {
                let curr = player.current;
                let last = player.last[0];

                player.next.unshift(curr);
                player.last.shift();
                player.last.push(curr);
                player.current = last;

                this.play(player.current, message);
                resolve(player);
            } catch (error) {
                this.log.error(`Ran into an error: ${error}`);
                message.send(this.lang.get('commands.music.error').format([error]), this.embed);
                reject(error);
            };
        });
    };
};
module.exports = AudioManager;