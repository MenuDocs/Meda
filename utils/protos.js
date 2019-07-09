const { Collection } = require("discord.js");
module.exports = {

	lower: String.prototype.lower = function() {
		return this.toLowerCase();
	},

	upper: String.prototype.upper = function() {
		return this.toUpperCase();
	},

	capitalize: String.prototype.capitalize = function() {
		return this.slice(0, 1).toUpperCase() + this.slice(1).toLowerCase();
	},

	between: Number.prototype.between = function (hi, lo) {
		let [min, max] = [ parseInt(hi), parseInt(lo) ];
		if (parseInt(this) > max || parseInt(this) < min) return false;
		else return true;
	},

	format: String.prototype.format = function(array) {
		str = this;
		for (var key in array) {
			str = str.replace(new RegExp("\\{" + key + "\\}", "g"), array[key]);
		}
		return str;
	},

	trunc: String.prototype.trunc = function(n, useWordBoundary){
		if (this.length <= n) return this;
		let subString = this.substr(0, n - 1);
		return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(" ")) : subString) + "...";
	},
	toCol: Object.toCol = function(o) {
		return new Collection(Object.keys(o).map(key => ([key, o[key]])));
	}
};