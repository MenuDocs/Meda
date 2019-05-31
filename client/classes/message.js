const MessageUtil = require('./util');
const EmbedBuilder = require('./embed');
const { Structures } = require('discord.js');
module.exports = Structures.extend('Message', C => {
    class AdvancedMessage extends C {
        constructor(client, data, channel) {
            super(client, data, channel);

            this.util = new MessageUtil(this);
            // this.send = (content, builder) => channel.send((builder || client.embed).message(content));
            // this.reply = (path, builder, language) => this.send(client.lang.get(path, language), builder);

        }


        /** 
         * Sends a message with a EmbedBuilder
         *
         * @param {String} content Content for the message
         * @param {EmbedBuilder} builder Embed Builder to use
         * @returns {this} The message send
         * @memberof EMessage
         */
        send(content, builder) {
            return this.channel.send((builder || this.client.embed).message(content));
        };
        
        /**
         * Equivalent to message.send(client.lang.get('...'), embed);
         * 
         * @param {String} path Path to the reply
         * @param {EmbedBuilder} builder Embed Builder to use
         * @param {String} [language="en_US"] the locale for the server
         * @returns {this}
         * @memberof EMessage
         */
        reply(path, builder, language = "en_US") {
            let reply = this.client.lang.get(path, language);
            return this.send(reply, builder);
        }

        sendTimed(content, time, builder) {
            return this.channel.send((builder || this.client.embed).message(content)).then(m => m.delete(time));
        }

    };
    return AdvancedMessage;
});