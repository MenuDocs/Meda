module.exports = {

    /* version for the bad spelling because i have too many imports */
    capatalize: String.prototype.capatalize = function() {
        return this.slice(0, 1).toUpperCase() + this.slice(1).toLowerCase();
    },

    capitalize: String.prototype.capitalize = function() {
        return this.slice(0, 1).toUpperCase() + this.slice(1).toLowerCase();
    },

    format: String.prototype.format = function(array) {
        str = this;
        for (var key in array) {
            str = str.replace(new RegExp("\\{" + key + "\\}", 'g'), array[key]);
        };
        return str;
    }
}