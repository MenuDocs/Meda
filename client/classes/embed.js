/**
 *  HryraUtils: JavaScript Version by: MeLike2D
 *  EmbedUtils: JAVA Original Owned By: Duncte123 or Duncan Sterken; Owner of DuncteBot
 *
 */

const RichEmbed = require('discord.js').MessageEmbed;

/**
 * Embed Utilities for your Bot!
 * implemented on version hryra.js@
 *
 * @author MeLike2D
 * @version HryraUtils-1.6.2
 * @class EmbedUtils
 */

module.exports = class EmbedUtils {

	/**
     * Set the Default Embed
     *
     * @param {RichEmbed} embed discord.js RichEmbed
     * @returns {void}
     * @memberof EmbedUtils class by MeLike2D
     */

	setDefaultEmbed(embed) {
		return new Promise(async (resolve, reject) => {
			try {
				this.defEmbed = new RichEmbed(embed);
				resolve(new RichEmbed(this.defEmbed));
			}
			catch (error) {
				reject(error);
			}
		});
	}

	/**
     * Gets the Default Embed
     *
     * @returns {RichEmbed} Default Embed
     * @memberof EmbedUtils class by MeLike2D
     */

	get defaultEmbed() {
		return new RichEmbed(this.defEmbed);
	}

	/**
     * Default Embed w/ Description
     *
     * @param {string} description
     * @returns {RichEmbed} Default Embed
     * @memberof EmbedUtils class by MeLike2D
     */

	message(description) {
		if (!description) throw new RangeError('Description may not be empty');
		return this.defaultEmbed.setDescription(description);
	}

	/**
     * Default Embed w/ Title
     *
     * @param {string} title
     * @returns {RichEmbed} Default Embed
     * @memberof EmbedUtils class by MeLike2D
     */

	title(title) {
		if (!title) throw new RangeError('RichEmbed title may not be empty');
		return this.defaultEmbed.setTitle(title);
	}

	/**
     * Default Embed w/ Image
     *
     * @param {string} url
     * @returns {RichEmbed}
     * @memberof EmbedUtils
     */

	image(url) {
		if (!url) throw new RangeError('RichEmbed url may not be empty');
		return this.defaultEmbed.setImage(url);
	}

	/**
     * Default Embed w/ url & title
     *
     * @param {string} url image url
     * @param {string} title embed title
     * @returns {RichEmbed}
     * @memberof EmbedUtils
     */

	imageTitle(url, title) {
		if (!url) throw new RangeError('RichEmbed url may not be empty');
		else if (!title) throw new RangeError('RichEmbed title may not be empty');
		return this.defaultEmbed.setImage(url).setTitle(title);
	}

	/**
     * Default Embed w/ Field
     *
     * @param {string} name field name
     * @param {string} value field value
     * @returns {RichEmbed}
     * @memberof EmbedUtils
     */

	field(name, value) {
		if (!url) throw new RangeError('RichEmbed field name may not be empty');
		else if (!title) throw new RangeError('RichEmbed field value may not be empty');
		return this.defaultEmbed.addField(name, value, false);
	}

	/**
     * Get a New Embed
     *
     * @returns {RichEmbed} Default Embed
     * @memberof EmbedUtils
     */

	supply() {
		if(!this.defEmbed) throw new TypeError('No Default Embed Supplied! Use embed.setDefaultEmbed(new Discord.RichEmbed()) to set one!');
		return new RichEmbed(this.defaultEmbed);
	}
};
