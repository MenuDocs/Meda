const { AudioProvider, Track } = require('cordclient');
const fetch = require('node-fetch');
const api = require('simple-youtube-api');

class MedaAudio extends AudioProvider { 
    constructor(client, config) {
        super(client, config);
        this.api = new api(config.yt);
        this.lang = client.registry.languages.get('en_US');
    };

    get embed() {
        return this.client.embed.get('audio');
    }

    get(id) {
        return this.interfaces.get(id) || null;
    }

    send(content, builder, message) {
        let builder_ = (builder || this.embed);
        return message.channel.send(builder_.message(content));
    }   

    async join({ guild, channel, member }) {
        try {
            this.log.info(`Created player: ${guild.name} (${guild.id}) [${this.idealNode.type} ${this.idealNode.host}]`);
            let player = super.join({
                host: this.idealNode.host,
                guild: guild.id,
                channel: member.voice.channel.id
            }, { selfdeaf: true });
            player.volume(await this.client.db.getGuild(guild.id, 'defvolume'));
            return player;
        } catch (error) {
            channel.send(this.embed.message(`\`\`\`js\n${error}\`\`\``, { url: "https://discord.gg/wMsK7cN", title: "Support Server" }));
            return this.log.error(error);
        };
    };

    disconnect(message, flags = []) {
        try {
            this.log.info(`Destroyed player: ${message.guild.name} (${message.guild.id}) [${this.idealNode.type} ${this.idealNode.host}]`);
            if(!flags.includes('silent')) this.send(`**<:yes:582718257807622154> Finished The Queue.**`, this.embed, message);
            return this.leave(message.guild.id)
        } catch (error) {
            message.channel.send(this.embed.message(`\`\`\`js\n${error}\`\`\``, { url: "https://discord.gg/wMsK7cN", title: "Support Server" }));
            return this.log.error(error);
        };
    };
	
	async search(query, message, max = 1) {
        let result = [];
        try {
            let songs = await this.api.searchVideos(query, max);
            for (let song of songs) {
                let res = await this.getTrack(song.url, max);   
                if (!Array.isArray(res) && res.isError && max > 1) res = Object.defineProperty({ title: `Load Error: ${this.errors.get(res.message)}` }, 'blank', { value: true });
                else if (!Array.isArray(res) && res.isError) return this.send(this.lang.get('commands.music.load_error').format([res.severity.capitalize(), res.message]), this.embed, message);
                result.push(Array.isArray(res) ? Object.assign(res[0], { isTrack: true, votes: [] }) : Object.assign(res, { isTrack: true, votes: [] }));
            };
            return result;
        } catch (error) {
            message.channel.send(this.embed.message(`\`\`\`js\n${error}\`\`\``, { url: "https://discord.gg/wMsK7cN", title: "Support Server" }));
            return this.log.error(error);
        }
	}
	
	getTrack(identifier, max = 1) {
        let ideal = this.idealNode;
        let uri = encodeURI(`http://${ideal.host}:${ideal.port}/loadtracks?identifier=${identifier}`);
        return fetch(uri, { headers: { authorization: ideal.password } }).then(res => res.json())
        .then(body => {
            let toReturn;
            if (body.status === 400) return Object.defineProperty(body, 'isError', { value: true });
            switch (body.loadType) {
                case 'TRACK_LOADED':
                    let tracks = body.tracks.map(track => new Track(track));
                    toReturn = max == 1 ? tracks.shift() : tracks.slice(0, max);
                break;
                case 'LOAD_FAILED':
                    if (!body.exception) body.exception = { severity: "unknown", message: body.loadType }
                    toReturn = Object.defineProperty(body.exception, 'isError', { value: true });     
                break;
                case 'NO_MATCHES':
                    if (!body.exception) body.exception = { severity: "unknown", message: body.loadType }
                    toReturn = Object.defineProperty(body.exception, 'isError', { value: true });
                break;
                default: break;
            };
            return toReturn;
        }).catch(error => {
            this.log.error(error);
            return { isError: true, error };
        });
    };
    
    handleTrack(message, track,  flags = []) {
        let player = this.get(message.guild.id);
        if (!track.isTrack) return
        try {
            track.requester = message.member.id;
            if (!player.current) {
                player.current = track;
                return this.play(track, message)
            } else {
                player.next.push(track);
                if(!flags.includes('silent')) message.channel.send(this.embed.message(this.lang.get('commands.music.enqueued_song').format([track.title]), { thumbnail: track.thumbnail }));
                return
            };
        } catch (error) {
            message.channel.send(this.embed.message(`\`\`\`js\n${error}\`\`\``, { url: "https://discord.gg/wMsK7cN", title: "Support Server" }));
            return this.log.error(error);
        }
    };

    async play(song, message) {
        let player = this.get(message.guild.id);
        if (!song) return;
        if (!player) return;
        try {
            player.play(song.track);
            player.on('end', async d => {   
                if (d.reason == 'REPLACED') return;
                if (d.reason == 'LOAD_FAILED') return this.send(this.lang.get('commands.music.load_failed'), this.embed, message);
                if (!player.repeat.track) {
                    player.previous.unshift(player.current);
                    player.current = player.next[0];
                    player.next.shift();
                } // else if(player.repeat.queue && !player.current && player.next.length < 1 && player.last.length >= 1) {
                //     player.current = player.last[(player.last.length - 1)];
                //     player.last.slice((player.last.length - 1));
                //     player.next = [ ...(player.last.reverse()) ];
                // };
                if(!player.current) return this.disconnect(message);
                await player.play(player.current.track);
                return message.channel.send(this.embed.message(this.lang.get('commands.music.playing_track').format([player.current.title])).setThumbnail(player.current.thumbnail));
            });
            return message.channel.send(this.embed.message(this.lang.get('commands.music.playing_track').format([player.current.title])).setThumbnail(player.current.thumbnail));
        } catch (error) {
            message.channel.send(this.embed.message(`\`\`\`js\n${error}\`\`\``, { url: "https://discord.gg/wMsK7cN", title: "Support Server" }));
            return this.log.error(error);
        };
    }
};

module.exports = MedaAudio;